const Observable = require("../utils/Observable");

class BurglarAlarm extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnBurglarAlarm (l) {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log('Burglar alarm turned on')
    }
    switchOffBurglarAlarm (l) {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log('Burglar alarm turned off')
    }
}

module.exports = BurglarAlarm