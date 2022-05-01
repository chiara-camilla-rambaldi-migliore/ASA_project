const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')

class CatNeedingGoal extends Goal {
}
class CatNeedingIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.cat_feeder = this.goal.parameters['cat_feeder']
    }
    static applicable(goal) {
        return goal instanceof CatNeedingGoal
    } 
    *exec(){
        while(true) {
            yield this.cat_feeder.notifyChange('cat_prossimity')
            if (this.cat_feeder.cat_prossimity == true){
                if(this.cat_feeder.status_food == 'empty'){
                    this.cat_feeder.getFoodFromCatFeeder()
                }
                if(this.cat_feeder.status_water == 'off'){
                    this.cat_feeder.turnOnWater()
                }
            } else if (this.cat_feeder.status_water == 'on'){
                this.cat_feeder.turnOffWater()
            }
        }
    }
}
module.exports = {CatNeedingGoal, CatNeedingIntention}