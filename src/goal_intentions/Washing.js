const Goal = require('../utils/Goal')
const Intention = require('../utils/Intention')
const Clock = require('../utils/Clock')
const PlanningGoal = require('../pddl/PlanningGoal')
const { RetryGoal, RetryFourTimesIntention } = require('../goal_intentions/RetryPlanning')

class WashingGoal extends Goal{
}

class WashingIntention extends Intention{
    constructor(agent, goal){
        super(agent, goal)
        this.dishwasher = this.goal.parameters['dishWasher']
        this.washingMachine = this.goal.parameters['washingMachine']
    }
    static applicable(goal) {
        return goal instanceof WashingGoal
    } 
    *exec(){
        while(true) {
            yield Clock.global.notifyChange('mm', 'washing')
            if(
                (Clock.global.dd>=1 && Clock.global.dd<6 && Clock.global.hh==21 && Clock.global.mm==30)
            ){
                //only dishwasher planning
                this.dishwasher.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['free_energy energy'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
            } else if (
                ((Clock.global.dd==6 || Clock.global.dd==7) && Clock.global.hh==21 && Clock.global.mm==30)
            ){
                //both dishwasher and washingMachine planning
                this.washingMachine.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['dried'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
                this.dishwasher.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['free_energy energy'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
            }
        }
    }
}

module.exports = { WashingGoal, WashingIntention}