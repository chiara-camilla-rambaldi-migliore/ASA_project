const Observable = require("../utils/Observable");
const chalk = require('chalk')

class ElectricScooter extends Observable {
    constructor (house, name) {
        super({status: "half_charge", position: "in_garage"})
        this.house = house;
        this.name = name;
    }
    chargeScooter () {
        let consumption = 0.275
        if(this.status == 'half_charge'){
            consumption = 0.275/2
        }
        
        //TODO prerequisites
        this.status = 'full_charge'
        //TODO: search how many KWh an half and fully charge of a scooter consumes
        this.house.utilities.electricity.consumption += consumption;
        // Include some messages logged on the console!
        console.log(chalk['cyan']('electric scooter charged'))
    }

    taken(){
        this.position = 'out_garage'
        console.log(chalk['cyan']('electric scooter taken out of garage'))
    }

    released(){
        this.position = 'in_garage'
        this.status = 'half_charge'
        console.log(chalk['cyan']('electric scooter in garage'))
    }
}

module.exports = ElectricScooter