const Observable = require("../utils/Observable");
const chalk = require('chalk')

class WashingMachine extends Observable {
    constructor (house, name) {
        super({status: "idle", charged: 0, tender: false})
        this.house = house;
        this.name = name;
    }
    setDirtyClothes (tender=false){
        this.charged += 1
        if(tender)
            this.tender = true
    }
    switchOnWashingMachine () {
        this.status = 'started'
        //TODO: increase consumption every 15 minutes of usage
        this.house.utilities.electricity.consumption += 200;
        this.house.utilities.electricity.powerLoad += 500;
        // Include some messages logged on the console!
        console.log(chalk['cyan'](this.name, 'washing machine turned on'))
    }
    switchOffWashingMachine () {
        this.status = 'finished'
        // Include some messages logged on the console!
        this.house.utilities.electricity.powerLoad -= 500;
        console.log(chalk['cyan'](this.name, 'washing machine turned off'))
    }
    preWash () {
        this.status = 'preWash'
        console.log(chalk['cyan'](this.name, 'is pre washing'))
    }
    startDry () {
        this.status = 'startDry'
        this.house.utilities.electricity.consumption += 2;
        this.house.utilities.electricity.powerLoad += 500;
        console.log(chalk['cyan'](this.name, 'has started drying'))
    }
    finishDry () {
        this.status = 'finishDry'
        this.house.utilities.electricity.powerLoad -= 500;
        console.log(chalk['cyan'](this.name, 'has finished drying'))
    }
    charge () {
        this.status = 'charge'
        console.log(chalk['cyan'](this.name, 'has charged clothes'))
    }
    discharge () {
        this.status = 'discharge'
        this.charged = 0
        this.tender = false
        console.log(chalk['cyan'](this.name, 'has discharged clothes'))
    }
    addNormalSoap () {
        this.status = 'addNormalSoap'
        console.log(chalk['cyan'](this.name, 'has added normal soap'))
    }
    addTenderSoap () {
        this.status = 'addTenderSoap'
        console.log(chalk['cyan'](this.name, 'has added tender soap'))
    }
}

module.exports = WashingMachine