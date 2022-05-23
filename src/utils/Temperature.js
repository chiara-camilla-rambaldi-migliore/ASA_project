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

    static #start = true

    static stopTemperatureSensor() {
        clearInterval(this.increaseInterval)
        Temperature.#start = false
        this.decreaseInterval = setInterval(function(){Temperature.global.degrees -= 1}, 500);
    }

    static startTemperatureSensor(reachTemperature) {
        clearInterval(this.decreaseInterval)
        Temperature.#start = true

        this.increaseInterval = setInterval(function(){
            var {degrees} = Temperature.global
            
            if(degrees<reachTemperature)
                Temperature.global.degrees += 1
            else {
                Temperature.stopTemperatureSensor()
            }
        }, 100);
    }

}

module.exports = Temperature