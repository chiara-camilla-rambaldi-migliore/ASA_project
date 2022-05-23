const Goal = require('../utils/Goal')
const Intention = require('../utils/Intention')
const Clock = require('../utils/Clock')

class ShowerGoal extends Goal{
}

class ShowerIntention extends Intention{
    constructor(agent, goal){
        super(agent, goal)
        this.towel_warmer = this.goal.parameters['towel_warmer']
    }
    static applicable(goal) {
        return goal instanceof ShowerGoal
    } 
    *exec(){
        while(true) {
            yield Clock.global.notifyChange('mm')
            if(
                ((Clock.global.dd==1 || Clock.global.dd==5) && Clock.global.hh==7 && Clock.global.mm==30) ||
                (Clock.global.dd>1 && Clock.global.dd<5 && Clock.global.hh==19 && Clock.global.mm==0) ||
                (Clock.global.dd>=1 && Clock.global.dd<6 && Clock.global.hh==16 && Clock.global.mm==0)
            ){
                this.towel_warmer.switchOnTowelWarmer()
            } else if (
                ((Clock.global.dd==1 || Clock.global.dd==5) && Clock.global.hh==8 && Clock.global.mm==0) ||
                (Clock.global.dd>1 && Clock.global.dd<5 && Clock.global.hh==19 && Clock.global.mm==30) ||
                (Clock.global.dd>=1 && Clock.global.dd<6 && Clock.global.hh==16 && Clock.global.mm==30)
            ){
                this.towel_warmer.switchOffTowelWarmer()
            }
        }
    }
}

module.exports = { ShowerGoal, ShowerIntention}