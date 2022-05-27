const Clock = require('./Clock')
const Observable =  require('./Observable')



/**
 * @static {global} is the global time
 * @static {startTimer()} method start the timer loop
 * 
 * Note that mm, hh, and dd are updated one at a time!
 * However, Observable handle observer callbacks in microtask queues, so that,
 * at the time observers are actually called, both mm, hh, and dd should all been up-to-date!
 */
class Temperature {

    static global = new Observable( {degrees: 19} )

    static format() {
        var temperature = Temperature.global
        return "Temperature: "+temperature.degrees+'°C'
    }

    static wallTemperature() {
        // Wall Temperature
        Temperature.global.observe('degrees', degrees => {
           console.log( Temperature.format() + '\t');
        })
    }

    static #start = false
    static #reachTemperature = 19

    static async startTemperatureSensor() {
        Temperature.#start = false
        while (true) {
            await Clock.global.notifyChange('mm', 'temperature').then(mm => {
                if(!Temperature.#start && (Clock.global.hh % 3)==0)
                    Temperature.global.degrees -= 1
                if(Temperature.#start && Clock.global.mm==30){
                    if(Temperature.global.degrees < Temperature.#reachTemperature)
                        Temperature.global.degrees += 1
                    else
                        Temperature.#start = false
                }
            })
        }
    }

    static increaseTemperature(reachTemperature) {
        Temperature.#start = true
        Temperature.#reachTemperature = reachTemperature
    }

}

module.exports = Temperature