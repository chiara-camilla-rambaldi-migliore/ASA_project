const Observable = require("../utils/Observable");
const chalk = require('chalk')

class CatFeeder extends Observable {
    constructor (house, name) {
        super({status_food: "empty", status_water: "off", cat_prossimity: false})
        this.house = house;
        this.name = name;
    }
    getFoodFromCatFeeder () {
        this.status_food = 'full'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 0.001;
        // Include some messages logged on the console!
        console.log(chalk['cyan']('cat feeder food bowl full'))
    }
    turnOnWater () {
        this.status_water = 'on'
        this.house.utilities.electricity.powerLoad += 1;
        this.house.utilities.electricity.consumption += 0.003;
        // Include some messages logged on the console!
        console.log(chalk['cyan']('cat feeder water on'))
    }
    turnOffWater () {
        this.status_water = 'off'
        this.house.utilities.electricity.powerLoad -= 1;
        // Include some messages logged on the console!
        console.log(chalk['cyan']('cat feeder water off'))
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