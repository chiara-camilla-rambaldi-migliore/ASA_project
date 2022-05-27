const Goal = require('../utils/Goal')
const Intention = require('../utils/Intention')
const Clock = require('../utils/Clock')

class ShowerGoal extends Goal{
}

class ShowerIntention extends Intention{
    constructor(agent, goal){
        super(agent, goal)
        this.towel_warmer = this.goal.parameters['towel_warmer']
        this.person = this.goal.parameters['person']
    }
    static applicable(goal) {
        return goal instanceof ShowerGoal
    } 
    *exec(){
        while(true) {
            yield this.person.notifyChange('shower_intention', 'shower')
            
            if(this.person.shower_intention)
            {
                let mm_start = Clock.global.mm
                this.towel_warmer.switchOnTowelWarmer()
                let funct = (mm) => {
                    if(Math.abs(mm-mm_start) == 30){
                        this.towel_warmer.switchOffTowelWarmer()
                        this.person.showered()
                        Clock.global.unobserve('mm', funct)
                    }
                }
                Clock.global.observe('mm',  funct)
            }
        }
    }
}

module.exports = { ShowerGoal, ShowerIntention}