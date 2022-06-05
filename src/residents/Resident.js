const Observable = require("../utils/Observable");

class Resident extends Observable {
    constructor (house, name, init) {
        super(init)
        this.house = house
        this.name = name
    }
    moveTo (to) {
        if (this.house.rooms[this.in_room.name].doors_to.find(element => element === to)) {
            this.in_room = to
            return true 
        }
        else
            return false
    }
}

module.exports = Resident