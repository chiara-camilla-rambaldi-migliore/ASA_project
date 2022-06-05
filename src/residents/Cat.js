const Resident = require("./Resident");

class Cat extends Resident {
    constructor (house, name, init) {
        super(house, name, init)
    }
}

module.exports = Cat