const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')
const Electricity = require('../utilities/Electricity')

class SenseConsumptionGoal extends Goal {
}



class SenseConsumptionIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Electricity} electricity */
        this.electricity = this.goal.parameters['electricity']
    }

    static applicable (goal) {
        return goal instanceof SenseConsumptionGoal
    }

    *exec () {
        while (true) {
            let status = yield this.electricity.notifyChange('consumption', 'senseConsumption')
            this.log('sense consumption status: ' + status + 'kW')
        }
    }

}

module.exports = { SenseConsumptionGoal, SenseConsumptionIntention }