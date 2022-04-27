const Clock = require("../utils/Clock");
const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')

class BrightnessGoal extends Goal {
}
class BrightnessIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.resident = this.goal.parameters['resident']
        this.room = this.goal.parameters['room']
    }
    static applicable(goal) {
        return goal instanceof BrightnessGoal
    } 
    *exec(){
        while(true) {
            yield this.resident.notifyChange('in_room')
            if (this.resident.in_room === this.room) {
                if(Clock.global.hh >= 7 && Clock.global.hh <= 19 && 'rollUpShutter' in this.room.devices && this.room.devices['rollUpShutter'].status == 'lowered'){
                    this.room.devices['rollUpShutter'].liftUpShutter()
                } else if(!(Clock.global.hh > 7 && Clock.global.hh < 19) && this.room.devices['light'].status == 'off'){
                    //TODO: check brightness
                    this.room.devices['light'].switchOnLight()
                }
            } else if(this.room.devices['light'].status == 'on'){
                this.room.devices['light'].switchOffLight()
            }
        }
    }
}
module.exports = {BrightnessGoal, BrightnessIntention}