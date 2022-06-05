const Clock = require("../utils/Clock");
const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')

class ScooterChargeGoal extends Goal {
}
class ScooterChargeIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.scooter = this.goal.parameters['scooter']
    }
    static applicable(goal) {
        return goal instanceof ScooterChargeGoal
    } 
    *exec(){
        while(true) {
            yield this.scooter.notifyChange('position', 'scooterCharge')
            if(
                this.scooter.position == "in_garage" && 
                (this.scooter.status=="half_charge" || this.scooter.status=="empty_charge")
            ){
                this.scooter.chargeScooter()
            }
        }
    }
}

module.exports = {ScooterChargeGoal, ScooterChargeIntention}