const Observable = require("../../../Autonode.js-master/src/utils/Observable");

class Thermostat extends Observable {
    constructor (house, name) {
        super({status: "18"})
        this.house = house;
        this.name = name;
        //TODO: how to define all possible status?
    }
    increaseTemperature () {
        this.status = String(parseInt(this.status)+1)
        // Include some messages logged on the console!
        console.log('Temperature increased to: ', this.status)
    }
    decreaseTemperature () {
        this.status = String(parseInt(this.status)-1)
        // Include some messages logged on the console!
        console.log('Temperature decreased to: ', this.status)
    }

    changeTemperture(degrees){
        this.status = String(degrees)

        console.log('Temperature changed to: ', this.status)
    }
}

module.exports = Thermostat