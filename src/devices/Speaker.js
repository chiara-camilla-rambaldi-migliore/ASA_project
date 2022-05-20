const Observable = require("../utils/Observable");

class Speaker extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnSpeaker () {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log(this.name, ' speaker turned on')
    }
    switchOffSpeaker () {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(this.name, ' speaker turned off')
    }
}

module.exports = Speaker