const Observable = require("../utils/Observable");
const chalk = require('chalk');
const Clock = require("../utils/Clock");

class BurglarAlarm extends Observable {
    constructor (house, name) {
        super({status: "off"})
        this.house = house;
        this.name = name;
    }
    switchOnBurglarAlarm (l) {
        this.status = 'on'
        //TODO: increase consumption every 15 minutes of usage
        callback = (mm) => {
            if(this.status == 'on')
                this.house.utilities.electricity.consumption += 1;
            else{
                Clock.global.unobserve('mm', callback, 'burglarAlarm')
            }
        }
        Clock.global.observe('mm', callback, 'burglarAlarm')
        this.house.utilities.electricity.powerLoad += 1;
        // Include some messages logged on the console!
        console.log(chalk['cyan']('Burglar alarm turned on'))
    }
    switchOffBurglarAlarm (l) {
        this.status = 'off'
        this.house.utilities.electricity.powerLoad -= 1;
        // Include some messages logged on the console!
        console.log(chalk['cyan']('Burglar alarm turned off'))
    }
}

module.exports = BurglarAlarm