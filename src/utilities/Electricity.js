const Observable = require("../../../Autonode.js-master/src/utils/Observable");

class Electricity extends Observable {
    constructor (house) {
        super({consumption: 0})
        this.house = house;
    }
}

module.exports = Electricity