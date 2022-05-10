const Observable = require("../../../Autonode.js-master/src/utils/Observable");

class CatFeeder extends Observable {
    constructor (house, name) {
        super({status_food: "empty", status_water: "off", cat_prossimity: false})
        this.house = house;
        this.name = name;
    }
    getFoodFromCatFeeder () {
        this.status_food = 'full'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log('cat feeder food bowl full')
    }
    turnOnWater () {
        this.status_water = 'on'
        // Include some messages logged on the console!
        console.log('cat feeder water on')
    }
    turnOffWater () {
        this.status_water = 'off'
        // Include some messages logged on the console!
        console.log('cat feeder water off')
    }
    catEatAndDrink(){
        this.cat_prossimity = true
        setTimeout(() => {
            this.cat_prossimity = false
            this.status_food = 'empty'
        }, 5, this);
    }
}


module.exports = CatFeeder