const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')
const Person = require('../residents/Person')

class SensePersonGoal extends Goal {
}



class SensePersonIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Person} person */
        this.person = this.goal.parameters['person']
    }

    static applicable (goal) {
        return goal instanceof SensePersonGoal
    }

    *exec () {
        while (true) {
            let status = yield this.person.notifyChange('shower_intention', 'sensor')
            this.log('sense shower intention: ' + this.person.name, status)
            if(status < 500){
                this.agent.beliefs.declare('resident_shower_intention')
            }
        }
    }

}

module.exports = { SensePersonGoal, SensePersonIntention }