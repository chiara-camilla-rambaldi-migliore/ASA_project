const Observable = require("../utils/Observable");
const chalk = require('chalk')

class Dishwasher extends Observable {
    constructor (house, name) {
        super({status: "idle", charged: 0, cristals: false})
        this.house = house;
        this.name = name;
    }
    setDirtyDishes (cristal=false){
        this.charged += 1
        if (cristal)
            this.cristals = true
    }
    switchOnDishwasher () {
        this.status = 'started'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 2.5;
        this.house.utilities.electricity.powerLoad += 500;
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' dishwasher turned on'))
    }
    switchOffDishwasher () {
        this.status = 'finished'
        this.house.utilities.electricity.powerLoad -= 500;
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, ' dishwasher turned off'))
    }
    rinseAid(){
        this.status = 'rinseAid'
        console.log(chalk['cyan'](this.name, ' is using rinse aid'))
    }
    preWash(){
        this.status = 'preWash'
        console.log(chalk['cyan'](this.name, ' is pre washing'))
    }
    charge () {
        this.status = 'charge'
        console.log(chalk['cyan'](this.name, 'has charged dishes'))
    }
    discharge () {
        this.status = 'discharge'
        this.cristals = false
        this.charged = 0
        console.log(chalk['cyan'](this.name, 'has discharged dishes'))
    }
    addSoap () {
        this.status = 'addSoap'
        console.log(chalk['cyan'](this.name, 'has added soap'))
    }
}

module.exports = Dishwasher