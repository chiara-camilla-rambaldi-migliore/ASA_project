const Resident = require("./Resident");

class Person extends Resident {
    constructor (house, name, init) {
        super(house, name, init)
    }
    willShowerIn30Min(){
        this.shower_intention = true
    }
    showered(){
        this.shower_intention = false
    }
}

module.exports = Person