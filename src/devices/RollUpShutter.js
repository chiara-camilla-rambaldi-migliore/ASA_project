const Observable = require("../../../Autonode.js-master/src/utils/Observable");

class RollUpShutter extends Observable {
    constructor (house, name) {
        super({status: "lowered"})
        this.house = house;
        this.name = name;
    }
    liftUpShutter () {
        this.status = 'lifted'
        //TODO: search how many KWh a roll up shutter consumes
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log(this.name, ' lifted up')
    }
    lowDownShutter () {
        this.status = 'lowered'
        // Include some messages logged on the console!
        console.log(this.name, ' lowered down')
    }
}

module.exports = RollUpShutter