const Observable = require("../utils/Observable");

class CatLitter extends Observable {
    constructor (house, name) {
        super({status: "dirty", cat_position: "out"})
        this.house = house;
        this.name = name;
    }
    cleanCatLitter () {
        //TODO prerequisites
        this.status = 'clean'
        this.house.utilities.electricity.consumption += 1;
        // Include some messages logged on the console!
        console.log('Cat litter cleaned')
    }
    catUseLitter(){
        this.cat_position = 'in'
        console.log('Cat is using the litter')
        setTimeout(() => {
            this.status = 'dirty'
            this.cat_position = 'out'
            console.log('Cat finished using the litter')
        }, 10, this);
    }
}

module.exports = CatLitter