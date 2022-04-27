const Clock = require("../utils/Clock");
const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')

class BrightnessGoal extends Goal {
}
class BrightnessIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.resident = this.goal.parameters['resident']
        this.rooms = this.goal.parameters['rooms']
    }
    static applicable(goal) {
        return goal instanceof BrightnessGoal
    } 
    *exec(){
        while(true) {
            yield this.resident.notifyChange('in_room')
            this.rooms.forEach(room => {
                if (this.resident.in_room === room) {
                    if(Clock.global.hh >= 7 && Clock.global.hh <= 19 && 'rollUpShutter' in room.devices && room.devices['rollUpShutter'].status == 'lowered'){
                        room.devices['rollUpShutter'].liftUpShutter()
                    } else if(!(Clock.global.hh >= 7 && Clock.global.hh <= 19) && room.devices['light'].status == 'off'){
                        //TODO: check brightness
                        room.devices['light'].switchOnLight()
                    }
                } else if(room.devices['light'].status == 'on'){
                    room.devices['light'].switchOffLight()
                }
            });
        }
    }
}
module.exports = {BrightnessGoal, BrightnessIntention}