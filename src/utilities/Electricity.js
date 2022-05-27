const Observable = require("../utils/Observable");

class Electricity extends Observable {
    constructor (house) {
        super({consumption: 0, powerLoad: 0})
        this.house = house;
    }
}

module.exports = Electricity