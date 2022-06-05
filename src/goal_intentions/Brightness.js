const Clock = require("../utils/Clock");
const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')

class BrightnessWithPresenceGoal extends Goal {
}
class BrightnessWithPresenceIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.resident = this.goal.parameters['resident']
        this.rooms = this.goal.parameters['rooms']
    }
    static applicable(goal) {
        return goal instanceof BrightnessWithPresenceGoal
    } 
    *exec(){
        while(true) {
            //TODO: switch on light at sunset and off at sunrise
            yield this.resident.notifyChange('in_room', 'brightness')
            this.rooms.forEach(room => {
                if(room.name != "outside"){
                    if (this.resident.in_room === room) {
                        if(Clock.global.hh >= 7 && Clock.global.hh <= 19 && 'rollUpShutter' in room.devices && room.devices['rollUpShutter'].status == 'lowered'){
                            room.devices['rollUpShutter'].liftUpShutter()
                        } else if(!(Clock.global.hh >= 7 && Clock.global.hh <= 19) && room.devices['light'].status == 'off'){
                            room.devices['light'].switchOnLight()
                        }
                    } else if(room.devices['light'].status == 'on'){
                        room.devices['light'].switchOffLight()
                    }
                }
            });
        }
    }
}

class BrightnessWithTimeGoal extends Goal {
}
class BrightnessWithTimeIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.residents = this.goal.parameters['residents']
        this.rooms = this.goal.parameters['rooms']
    }
    static applicable(goal) {
        return goal instanceof BrightnessWithTimeGoal
    } 
    *exec(){
        while(true) {
            yield Clock.global.notifyChange('mm', 'brightness')
            // if it's sunrise and light are on, then switch them off and lift the shutters
            // if it's unset and shutter are lifted and light off
            this.residents.forEach(resident => {
                if(resident.in_room.name != 'outside'){
                    if(
                        Clock.global.hh>=7 && 
                        Clock.global.hh<19 &&
                        Clock.global.mm>=0 && 
                        resident.in_room.devices['light'].status == 'on'
                    ){
                        resident.in_room.devices['rollUpShutter'].liftUpShutter()
                        resident.in_room.devices['light'].switchOffLight()
                    } else if (
                        Clock.global.hh>=19 && 
                        (Clock.global.hh<22 || (Clock.global.hh==22 && Clock.global.mm<=30)) && 
                        resident.in_room.devices['light'].status == 'off'
                    ){
                        resident.in_room.devices['light'].switchOnLight()
                    } else if (
                        Clock.global.hh>=22 && 
                        Clock.global.mm>=45
                    ){
                        if(resident.in_room.devices['light'].status == 'on'){
                            resident.in_room.devices['light'].switchOffLight()
                        }
                        this.rooms.forEach(room => {
                            if('rollUpShutter' in room.devices && room.devices['rollUpShutter'].status == 'lifted'){
                                room.devices['rollUpShutter'].lowDownShutter()
                            }
                        })
                    }
                }
            });
        }
    }
}
module.exports = {BrightnessWithPresenceGoal, BrightnessWithPresenceIntention, BrightnessWithTimeGoal, BrightnessWithTimeIntention}