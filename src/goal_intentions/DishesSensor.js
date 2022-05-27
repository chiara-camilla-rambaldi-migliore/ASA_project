const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')
const Dishwasher = require('../devices/Dishwasher')

class SenseDishesGoal extends Goal {
}



class SenseDishesIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Dishwasher} dishwasher */
        this.dishwasher = this.goal.parameters['dishwasher']
    }

    static applicable (goal) {
        return goal instanceof SenseDishesGoal
    }

    *exec () {
        while (true) {
            let status = yield this.dishwasher.notifyChange('charged', 'dishesSensor')
            this.log('sense dishes charge status: ' + status)
            if(status >= 2){
                this.agent.beliefs.declare('cleaned dishwasher', false)
                this.agent.beliefs.declare('charged dishwasher')
                if(this.dishwasher.cristals){
                    this.agent.beliefs.declare('cristal_to_rinse dishwasher')
                } else{
                    this.agent.beliefs.declare('cristal_to_rinse dishwasher', false)
                }
            } else {
                // this.agent.beliefs.declare('cleaned dishwasher')
            }
        }
    }

}

module.exports = { SenseDishesGoal, SenseDishesIntention }