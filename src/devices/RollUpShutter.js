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
        this.house.utilities.electricity.consumption += 0.001;
        console.log(chalk['cyan'](this.name, ' lifted up'))
    }
    lowDownShutter () {
        this.status = 'lowered'
        this.house.utilities.electricity.consumption += 0.001;
        console.log(chalk['cyan'](this.name, ' lowered down'))
    }
}

module.exports = RollUpShutter