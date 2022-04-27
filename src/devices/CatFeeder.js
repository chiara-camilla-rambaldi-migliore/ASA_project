const Observable = require("../../../Autonode.js-master/src/utils/Observable");

class CatFeeder extends Observable {
    constructor (house, name) {
        super({status_food: "empty_food", status_water: "off", cat_prossimity: "none"})
        this.house = house;
        this.name = name;
    }
    getFoodFromCatFeeder (l) {
        this.status_food = 'full_food'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log('cat feeder food bowl full')
    }
    turnOnWater (l) {
        this.status_water = 'on'
        // Include some messages logged on the console!
        console.log('cat feeder water on')
    }
    turnOffWater (l) {
        this.status_water = 'off'
        // Include some messages logged on the console!
        console.log('cat feeder water off')
    }
}


module.exports = CatFeeder