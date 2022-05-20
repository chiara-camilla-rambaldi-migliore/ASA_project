const Observable = require("../utils/Observable");

class Light extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnLight () {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log(this.name, ' light turned on')
    }
    switchOffLight () {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(this.name, ' light turned off')
    }
}

module.exports = Light