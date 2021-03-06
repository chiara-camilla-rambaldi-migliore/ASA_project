const Observable =  require('./Observable')
var readline = require('readline');


/**
 * @static {global} is the global time
 * @static {startTimer()} method start the timer loop
 * 
 * Note that mm, hh, and dd are updated one at a time!
 * However, Observable handle observer callbacks in microtask queues, so that,
 * at the time observers are actually called, both mm, hh, and dd should all been up-to-date!
 */
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
class Clock {

    static global = new Observable( {dd: 1, hh: 0, mm: 0} )

    static format() {
        var time = Clock.global
        return days[time.dd-1] + ':' + (time.hh<10?'0':'')+time.hh + ':' + (time.mm==0?'00':time.mm)
    }

    static wallClock() {
        // Wall clock
        Clock.global.observe('mm', mm => {
            var time = Clock.global
            readline.clearLine(process.stdout);
            readline.cursorTo(process.stdout, 0);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write( Clock.format() + '\t');
            // console.log(Clock.format())
        })
    }

    static #start = true

    static async stopTimer() {
        Clock.#start = false
    }

    static async startTimer() {

        Clock.#start = true

        while(Clock.#start) {
            await new Promise( res => setTimeout(res, 150))
            
            var {dd, hh, mm} = Clock.global
            if(mm<60-15)
                Clock.global.mm += 15
            else {
                if(hh<23) {
                    Clock.global.hh += 1 // increased hh but mm still 45
                    Clock.global.mm = 0 // however, observers are handled as microtask so at the time they are called everything will be sync
                }
                else {
                    Clock.global.mm = 0
                    Clock.global.hh = 0
                    if(dd<7){
                        Clock.global.dd += 1
                    } else {
                        Clock.global.dd = 1
                    }
                }
            }
        }
    }

}



// // Daily schedule
// Clock.global.observe('mm', (mm) => {
//     var time = Clock.global
//     if(time.hh==12 && time.mm==0)
//         console.log('lunch time '+Clock.format())
//     if(time.hh==13 && time.mm==30)
//         console.log('end lunch time '+Clock.format())
//     if(time.hh==19 && time.mm==0)
//         console.log('dinner time '+Clock.format())
//     if(time.hh==20 && time.mm==15)
//         console.log('end dinner time '+Clock.format())
// })



module.exports = Clock