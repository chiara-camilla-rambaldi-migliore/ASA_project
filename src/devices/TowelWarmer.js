const Observable = require("../utils/Observable");
const chalk = require('chalk')

class TowelWarmer extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnTowelWarmer () {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 0.2;
        this.house.utilities.electricity.powerLoad += 50;
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' towel warmer turned on'))
    }
    switchOffTowelWarmer () {
        this.status = 'off'
        this.house.utilities.electricity.powerLoad -= 50;
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' towel warmer turned off'))
    }
}

module.exports = TowelWarmer