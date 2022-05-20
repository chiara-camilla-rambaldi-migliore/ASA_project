const fs = require('fs')



class PddlProblem {
    
    constructor (name, objects = [], inits = [], goals = []) {
        this.name = name

        this.objects = objects
        this.objects.toPddlString = () => {
            return this.objects.join(' ')
        }

        this.inits = inits
        this.inits.toPddlString = () => {
            return `${inits.map( p => {
                let not = p.split(' ')[0]=='not'
                if (!not){
                    return '(' + p + ')'
                }
            }).join(' ')}`
        }

        this.goals = goals
        this.goals.toPddlString = () => {
            return `(and 
                ${goals.map( p => {
                    let not = p[0].split(' ')[0]=='not'
                    let predicate = (not ? p[0].split(' ')[1] : p[0])
                    let args = p.slice(1).join(' ')
                    if (not)
                        return '(not (' + predicate + ' ' + args + '))'
                    return '(' + predicate + ' ' + args + ')'
                }).join(' ')} )`
        }
    }

    addObject ( ...object ) {
        this.objects.push(...object)
    }

    addInit (...init) {
        this.inits.push(...init)
    }

    addGoal (...goal) {
        this.goals.push(...goal)
    }

    saveToFile () {
        var path = './tmp/problem-'+this.name+'.pddl'
        
        return new Promise( (res, rej) => {
            fs.writeFile(path, this.content, err => {
                if (err)
                    rej(err)
                else // console.log("File written successfully");
                    res(path)
            })

        })

    }

    get content() {
        let objects = this.objects.toPddlString()
        let init = this.inits.toPddlString()
        let goal = this.goals.toPddlString()
        let content =  `\
            ;; problem file: problem-${this.name}.pddl
            (define (problem ${this.name})
                (:domain ${this.name})
                (:objects ${objects})
                (:init ${init})
                (:goal ${goal})
            )
        `
        return content
    }

}



// var lightProblem = new PddlProblem('lights')
// lightProblem.addObject(...['light1', 'light2'], 'light3')
// lightProblem.addInit('switched-off light1', 'switched-off light2')
// lightProblem.addGoal('switched-on light1')
// lightProblem.saveToFile()



module.exports = PddlProblem