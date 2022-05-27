const Observable = require("../utils/Observable");
const chalk = require('chalk')
const Clock = require("../utils/Clock");

class Light extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnLight () {
        this.status = 'on'

        //TODO: increase consumption every 15 minutes of usage
        callback = (mm) => {
            if(this.status == 'on')
                this.house.utilities.electricity.consumption += 0.002;
            else{
                Clock.global.unobserve('mm', callback, 'light_'+this.name)
            }
        }
        Clock.global.observe('mm', callback, 'light_'+this.name)

        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' light turned on'))
    }
    switchOffLight () {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' light turned off'))
    }
}

module.exports = Light