const Observable = require("../utils/Observable");
const chalk = require('chalk')
const Clock = require("../utils/Clock");

class Light extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnLight () {
        this.status = 'on'

        this.house.utilities.electricity.consumption += 0.004;

        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' light turned on'))
    }
    switchOffLight () {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' light turned off'))
    }
}

module.exports = Light