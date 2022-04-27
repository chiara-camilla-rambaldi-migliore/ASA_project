const Observable = require("../../../Autonode.js-master/src/utils/Observable");

class Dishwasher extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnDishwasher (l) {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log(this.name, ' dishwasher turned on')
    }
    switchOffDishwasher (l) {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(this.name, ' dishwasher turned off')
    }
}

module.exports = Dishwasher