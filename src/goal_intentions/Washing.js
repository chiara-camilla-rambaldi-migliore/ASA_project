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
        this.dishwasherAgent = this.goal.parameters['dishWasher']
        this.washingMachineAgent = this.goal.parameters['washingMachine']
    }
    static applicable(goal) {
        return goal instanceof WashingGoal
    } 
    *exec(){
        while(true) {
            yield Clock.global.notifyChange('mm', 'washing')
            if(
                (Clock.global.dd>=1 && Clock.global.dd<6 && Clock.global.hh==4 && Clock.global.mm==0) &&
                (this.dishwasherAgent.beliefs.charged)
            ){
                //only dishwasher planning
                this.dishwasherAgent.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['free_energy energy'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
            } else if (
                ((Clock.global.dd==6 || Clock.global.dd==7) && Clock.global.hh==2 && Clock.global.mm==0)
            ){
                //both dishwasher and washingMachine planning
                if(this.washingMachineAgent.beliefs.charged)
                    this.washingMachineAgent.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['dried'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
                if(this.dishwasherAgent.beliefs.charged)
                    this.dishwasherAgent.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['free_energy energy'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
            }
        }
    }
}

module.exports = { WashingGoal, WashingIntention}