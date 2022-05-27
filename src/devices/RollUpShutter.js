const Observable = require("../utils/Observable");
const chalk = require('chalk')

class RollUpShutter extends Observable {
    constructor (house, name) {
        super({status: "lowered"})
        this.house = house;
        this.name = name;
    }
    liftUpShutter () {
        this.status = 'lifted'
        //TODO: search how many KWh a roll up shutter consumes
        this.house.utilities.electricity.consumption = 0.002;
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' lifted up'))
    }
    lowDownShutter () {
        this.status = 'lowered'
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' lowered down'))
    }
}

module.exports = RollUpShutter