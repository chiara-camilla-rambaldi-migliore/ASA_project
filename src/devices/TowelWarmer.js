const Observable = require("../utils/Observable");

class TowelWarmer extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnTowelWarmer (l) {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log(this.name, ' towel warmer turned on')
    }
    switchOffTowelWarmer (l) {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(this.name, ' towel warmer turned off')
    }
}

module.exports = TowelWarmer