const Intention = require('../utils/Intention')
const Goal = require('../utils/Goal')

class CatFeederGoal extends Goal {
}
class CatFeederIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.cat_feeder = this.goal.parameters['cat_feeder']
    }
    static applicable(goal) {
        return goal instanceof CatFeederGoal
    } 
    *exec(){
        while(true) {
            yield this.cat_feeder.notifyChange('cat_prossimity', 'cat_feeder')
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

class CatLitterGoal extends Goal {
}
class CatLitterIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.cat_litter = this.goal.parameters['cat_litter']
    }
    static applicable(goal) {
        return goal instanceof CatLitterGoal
    } 
    *exec(){
        while(true) {
            yield this.cat_litter.notifyChange('status', 'cat_litter')
            if (this.cat_litter.status == 'dirty' && this.cat_litter.cat_position == 'out'){
                this.cat_litter.cleanCatLitter()
            }
        }
    }
}

module.exports = {CatFeederGoal, CatFeederIntention, CatLitterGoal, CatLitterIntention}