const Goal = require("../utils/Goal");
const Intention = require("../utils/Intention");

class HeatingGoal extends Goal {
}
class HeatingIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.thermostat = this.goal.parameters['thermostat']
    }
    static applicable(goal) {
        return goal instanceof HeatingGoal
    } 
    *exec(){
        while(true) {
            yield this.thermostat.notifyChange('status')
            if (this.thermostat.status < 19) {
                this.thermostat.increaseTemperature()
            }
        }
    }
}
module.exports = {HeatingGoal, HeatingIntention}