const Goal = require("../utils/Goal");
const Intention = require("../utils/Intention");
const Temperature = require('../utils/Temperature');

class HeatingGoal extends Goal {
}
class HeatingIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.thermostat = this.goal.parameters['thermostat']
    }
    static applicable(goal) {
        return goal instanceof HeatingGoal
    } 
    *exec(){
        while(true) {
            yield Temperature.global.notifyChange('degrees')
            if(Temperature.global.degrees<parseInt(this.thermostat.status)){
                console.log("Thermostat: trying to increase temperature")
                Temperature.startTemperatureSensor(this.thermostat.status)
            }
        }
    }
}
class HeatingThermostatGoal extends Goal {
}
class HeatingThermostatIntention extends Intention {
    constructor(agent, goal){
        super(agent, goal)
        this.thermostat = this.goal.parameters['thermostat']
    }
    static applicable(goal) {
        return goal instanceof HeatingThermostatGoal
    } 
    *exec(){
        while(true) {
            yield this.thermostat.notifyChange('status')
            if(Temperature.global.degrees<parseInt(this.thermostat.status)){
                console.log("Thermostat: trying to increase temperature")
                Temperature.startTemperatureSensor(this.thermostat.status)
            }
        }
    }
}
module.exports = {HeatingGoal, HeatingIntention, HeatingThermostatGoal, HeatingThermostatIntention}