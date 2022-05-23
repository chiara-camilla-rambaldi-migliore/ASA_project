const Observable = require("../utils/Observable");
const chalk = require('chalk')

class Thermostat extends Observable {
    constructor (house, name) {
        super({status: "19"})
        this.house = house;
        this.name = name;
        //TODO: how to define all possible status?
    }
    increaseTemperature () {
        this.status = String(parseInt(this.status)+1)
        // Include some messages logged on the console!
        console.log(chalk['cyan']('Temperature increased to: ', this.status))
    }
    decreaseTemperature () {
        this.status = String(parseInt(this.status)-1)
        // Include some messages logged on the console!
        console.log(chalk['cyan']('Temperature decreased to: ', this.status))
    }

    changeTemperture(degrees){
        this.status = String(degrees)

        console.log(chalk['cyan']('Temperature changed to: ', this.status))
    }
}

module.exports = Thermostat