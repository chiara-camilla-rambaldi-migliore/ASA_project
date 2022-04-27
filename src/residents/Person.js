const Observable = require("../../../Autonode.js-master/src/utils/Observable");

class Person extends Observable {
    constructor (house, name, init) {
        super(init)
        this.house = house
        this.name = name
        this.set('in_room', 'bedroom')
    }
    moveTo (to) {
        if ( to in this.house.rooms[this.in_room].doors_to ) {
            this.in_room = to
            return true 
        }
        else
            return false
    }
}

module.exports = Person