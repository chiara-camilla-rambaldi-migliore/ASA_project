const Observable = require("../utils/Observable");

class WashingMachine extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnWashingMachine (l) {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log(this.name, ' washing machine turned on')
    }
    switchOffWashingMachine (l) {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(this.name, ' washing machine turned off')
    }
}

module.exports = WashingMachine