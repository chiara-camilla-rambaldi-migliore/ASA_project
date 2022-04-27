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
        return "temperature: "+temperature+'°C'
    }

    static wallTemperature() {
        // Wall Temperature
        Temperature.global.observe('degrees', degrees => {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write( Temperature.format() + '\t');
        })
    }

    static #start = true

    static async stopTemperatureSensor() {
        Temperature.#start = false
    }

    static async startTemperatureSensor(reachTemperature) {

        Temperature.#start = true

        while(Temperature.#start) {
            await new Promise( res => setTimeout(res, 500))
            
            var {degrees} = Temperature.global
            
            if(degrees<reachTemperature)
                Temperature.global.degrees += 1
            else {
                this.stopTemperatureSensor()
            }
        }
    }

}

module.exports = Temperature