const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')
const Electricity = require('../utilities/Electricity')

class SensePowerLoadGoal extends Goal {
}



class SensePowerLoadIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Electricity} electricity */
        this.electricity = this.goal.parameters['electricity']
    }

    static applicable (goal) {
        return goal instanceof SensePowerLoadGoal
    }

    *exec () {
        while (true) {
            let status = yield this.electricity.notifyChange('consumption')
            this.log('sense powerload status: ' + status)
            if(status < 500){
                this.agent.beliefs.declare('free_energy energy')
            }
        }
    }

}

module.exports = { SensePowerLoadGoal, SensePowerLoadIntention }