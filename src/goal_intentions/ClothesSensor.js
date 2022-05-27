const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')
const WashingMachine = require('../devices/WashingMachine')

class SenseClothesGoal extends Goal {
}



class SenseClothesIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {WashingMachine} washingMachine */
        this.washingMachine = this.goal.parameters['washingMachine']
    }

    static applicable (goal) {
        return goal instanceof SenseClothesGoal
    }

    *exec () {
        while (true) {
            let status = yield this.washingMachine.notifyChange('charged', 'clothesSensor')
            this.log('sense clothes charge status: ' + status)
            if(status >= 5){
                this.agent.beliefs.declare('cleaned washingMachine', false)
                this.agent.beliefs.declare('charged washingMachine')
                if(this.washingMachine.tender){
                    this.agent.beliefs.declare('tender washingMachine')
                } else{
                    this.agent.beliefs.declare('tender washingMachine', false)
                }
            }
        }
    }

}

module.exports = { SenseClothesGoal, SenseClothesIntention }