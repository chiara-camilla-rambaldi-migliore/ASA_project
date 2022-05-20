const pddlActionIntention = require('../pddl/actions/pddlActionIntention')
const Agent = require('../utils/Agent')
const Goal = require('../utils/Goal')
const Intention = require('../utils/Intention')
const PlanningGoal = require('../pddl/PlanningGoal')


/**
 * World agent
 */
const world = new Agent('world');
{

    class FakeAction {

        constructor (agent, parameters) {
            this.agent = agent
            this.parameters = parameters
        }

        get precondition () {
            return pddlActionIntention.ground(this.constructor.precondition, this.parameters)
        }
        
        checkPrecondition () {
            return this.agent.beliefs.check(...this.precondition);
        }

        get effect () {
            return pddlActionIntention.ground(this.constructor.effect, this.parameters)
        }

        applyEffect () {
            for ( let b of this.effect )
                this.agent.beliefs.apply(b)
        }

        async checkPreconditionAndApplyEffect () {
            if ( this.checkPrecondition() ) {
                this.applyEffect()
                await new Promise(res=>setTimeout(res,1000))
            }
            else
                throw new Error('pddl precondition not valid'); //Promise is rejected!
        }

    }

    class RinseAid extends FakeAction {
        static parameters = ['energy', 'agent']
        static precondition = [ 
            ['cristal_to_rinse', 'agent'], 
            ['not free_energy', 'energy'],
            ['consume_energy', 'agent', 'energy'], 
            ['washing', 'agent'],
            ['soap', 'agent'],
            ['charged', 'agent']
        ]
        static effect = [ 
            ['not cristal_to_rinse', 'agent'], 
        ]
    }

    class Start extends FakeAction {
        static parameters = ['energy', 'agent']
        static precondition = [ 
            ['free_energy', 'energy'], 
            ['not consume_energy', 'agent', 'energy'], 
            ['not washing', 'agent'],
            ['soap', 'agent'],
            ['charged', 'agent']
        ]
        static effect = [ 
            ['consume_energy', 'agent', 'energy'],
            ['not free_energy', 'energy'],
            ['washing', 'agent']
        ]
    }

    class PreWash extends FakeAction {
        static parameters = ['energy', 'agent']
        static precondition = [ 
            ['very_dirty', 'agent'],
            ['not cleaned', 'agent'],
            ['consume_energy', 'agent', 'energy'], 
            ['not free_energy', 'energy'], 
            ['washing', 'agent'], 
            ['soap', 'agent'],
            ['charged', 'agent']
        ]
        static effect = [ 
            ['not very_dirty', 'agent']
        ]
    }

    class StartDry extends FakeAction {
        static parameters = ['energy', 'agent']
        static precondition = [
            ['charged', 'agent'],
            ['not washing', 'agent'],
            ['not drying', 'agent'],
            ['not dried', 'agent'],
            ['cleaned', 'agent'],
            ['not consume_energy', 'agent', 'energy'], 
            ['free_energy', 'energy']
        ]
        static effect = [
            ['drying', 'agent'],
            ['consume_energy', 'agent', 'energy'], 
            ['not free_energy', 'energy']
        ]
    }

    class FinishDry extends FakeAction {
        static parameters = ['energy', 'agent']
        static precondition = [
            ['charged', 'agent'],
            ['not washing', 'agent'],
            ['drying', 'agent'],
            ['not dried', 'agent'],
            ['cleaned', 'agent'],
            ['consume_energy', 'agent', 'energy'], 
            ['not free_energy', 'energy'], 
        ]
        static effect = [
            ['dried', 'agent'],
            ['not consume_energy', 'agent', 'energy'],  
            ['free_energy', 'energy'], 
        ]
    }

    class Charge extends FakeAction {
        static parameters = ['agent']
        static precondition = [ 
            ['not washing', 'agent'],
            ['not charged', 'agent'],
        ]
        static effect = [ 
            ['charged', 'agent'],
            ['not cleaned', 'agent']
        ]
    }

    class Discharge extends FakeAction {
        static parameters = ['agent']
        static precondition = [ 
            ['not washing', 'agent'],
            ['charged', 'agent'],
            ['cleaned', 'agent']
        ]
        static effect = [ 
            ['not charged', 'agent']
        ]
    }

    class Finish extends FakeAction {
        static parameters = ['energy', 'agent']
        static precondition = [ 
            ['not cristal_to_rinse', 'agent'], 
            ['not very_dirty', 'agent'],
            ['washing', 'agent'], 
            ['charged', 'agent'],
            ['not cleaned', 'agent'],
            ['consume_energy', 'agent', 'energy'], 
            ['not free_energy', 'energy']
        ]
        static effect = [ 
            ['cleaned', 'agent'],
            ['not washing', 'agent'],
            ['not consume_energy', 'agent', 'energy'], 
            ['free_energy', 'energy'],
            ['not soap', 'agent'],
            ['not dried', 'agent'],
            ['not drying', 'agent']
        ]
    }

    class AddNormalSoap extends FakeAction {
        static parameters = ['agent']
        static precondition = [ 
            ['charged', 'agent'],
            ['not tender', 'agent'],
            ['not washing', 'agent'],
            ['not soap', 'agent']
        ]
        static effect = [ 
            ['soap', 'agent']
        ]
    }

    class AddTenderSoap extends FakeAction {
        static parameters = ['agent']
        static precondition = [ 
            ['charged', 'agent'],
            ['tender', 'agent'],
            ['not washing', 'agent'],
            ['not soap', 'agent']
        ]
        static effect = [ 
            ['soap', 'agent']
        ]
    }

    world.rinseAid = function ({energy, agent} = args) {
        this.log('rinseAid', energy, agent)
        return new RinseAid(world, {energy, agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.rinseAid failed:', err.message || err); throw err;})
    }

    world.start = function ({energy, agent} = args) {
        this.log('start', energy, agent)
        return new Start(world, {energy, agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.start failed:', err.message || err); throw err;})
    }

    world.preWash = function ({energy, agent} = args) {
        this.log('preWash', energy, agent)
        return new PreWash(world, {energy, agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.preWash failed:', err.message || err); throw err;})
    }

    world.charge = function ({agent} = args) {
        this.log('charge', agent)
        return new Charge(world, {agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.charge failed:', err.message || err); throw err;})
    }

    world.discharge = function ({agent} = args) {
        this.log('discharge', agent)
        return new Discharge(world, {agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.discharge failed:', err.message || err); throw err;})
    }

    world.finish = function ({energy, agent} = args) {
        this.log('finish', energy, agent)
        return new Finish(world, {energy, agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.finish failed:', err.message || err); throw err;})
    }

    world.addNormalSoap = function ({agent} = args) {
        this.log('addNormalSoap', agent)
        return new AddNormalSoap(world, {agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.addNormalSoap failed:', err.message || err); throw err;})
    }
    
    world.addTenderSoap = function ({agent} = args) {
        this.log('addTenderSoap', agent)
        return new AddTenderSoap(world, {agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.addTenderSoap failed:', err.message || err); throw err;})
    }

    world.startDry = function ({energy, agent} = args) {
        this.log('startDry', energy, agent)
        return new StartDry(world, {energy, agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.startDry failed:', err.message || err); throw err;})
    }

    world.finishDry = function ({energy, agent} = args) {
        this.log('finishDry', energy, agent)
        return new FinishDry(world, {energy, agent} ).checkPreconditionAndApplyEffect()
        .catch(err=>{this.error('world.finishDry failed:', err.message || err); throw err;})
    }
}




/**
 * Washing agents
 */
{
    class RinseAid extends pddlActionIntention {
        static parameters = ['energy'];
        static precondition = [ 
            ['cristal_to_rinse'], 
            ['not free_energy', 'energy'],
            ['consume_energy', 'energy'], 
            ['washing'],
            ['soap'],
            ['charged']
        ];
        static effect = [ 
            ['not cristal_to_rinse'], 
        ];
        *exec ({energy}=parameters) {
            yield world.rinseAid({energy, agent: this.agent.name})
        }
    }

    class Start extends pddlActionIntention {
        static parameters = ['energy'];
        static precondition = [ 
            ['free_energy', 'energy'], 
            ['not consume_energy', 'energy'], 
            ['not washing'],
            ['soap'],
            ['charged']
        ];
        static effect = [ 
            ['consume_energy', 'energy'],
            ['not free_energy', 'energy'],
            ['washing']
        ];
        *exec ({energy}=parameters) {
            yield world.start({energy, agent: this.agent.name})
        }
    }

    class PreWash extends pddlActionIntention {
        static parameters = ['energy'];
        static precondition = [ 
            ['very_dirty'],
            ['not cleaned'],
            ['consume_energy', 'energy'], 
            ['not free_energy', 'energy'], 
            ['washing'], 
            ['soap'],
            ['charged']
        ];
        static effect = [ 
            ['not very_dirty']
        ];
        *exec ({energy}=parameters) {
            yield world.preWash({energy, agent: this.agent.name})
        }
    }

    class StartDry extends pddlActionIntention {
        static parameters = ['energy'];
        static precondition = [
            ['charged'],
            ['not washing'],
            ['not drying'],
            ['not dried'],
            ['cleaned'],
            ['not consume_energy', 'energy'], 
            ['free_energy', 'energy']
        ];
        static effect = [
            ['drying'],
            ['consume_energy', 'energy'], 
            ['not free_energy', 'energy']
        ];
        *exec ({energy}=parameters) {
            yield world.startDry({energy, agent: this.agent.name})
        }
    }

    class FinishDry extends pddlActionIntention {
        static parameters = ['energy'];
        static precondition = [
            ['charged'],
            ['not washing'],
            ['drying'],
            ['not dried'],
            ['cleaned'],
            ['consume_energy', 'energy'], 
            ['not free_energy', 'energy']
        ];
        static effect = [
            ['dried'],
            ['not consume_energy', 'energy'], 
            ['free_energy', 'energy']
        ];
        *exec ({energy}=parameters) {
            yield world.finishDry({energy, agent: this.agent.name})
        }
    }

    class Charge extends pddlActionIntention {
        static parameters = [];
        static precondition = [ 
            ['not washing'],
            ['not charged']
        ];
        static effect = [ 
            ['charged'],
            ['not cleaned']
        ];
        *exec () {
            yield world.charge({agent: this.agent.name})
        }
    }

    class Discharge extends pddlActionIntention {
        static parameters = [];
        static precondition = [ 
            ['not washing'],
            ['charged'],
            ['cleaned']
        ];
        static effect = [ 
            ['not charged']
        ];
        *exec () {
            yield world.discharge({agent: this.agent.name})
        }
    }

    class Finish extends pddlActionIntention {
        static parameters = ['energy'];
        static precondition = [ 
            ['not cristal_to_rinse'], 
            ['not very_dirty'],
            ['washing'], 
            ['charged'],
            ['not cleaned'],
            ['consume_energy', 'energy'], 
            ['not free_energy', 'energy']
        ];
        static effect = [ 
            ['cleaned'],
            ['not washing'],
            ['not consume_energy', 'energy'], 
            ['free_energy', 'energy'],
            ['not soap'],
            ['not dried'],
            ['not drying']
        ];
        *exec ({energy}=parameters) {
            yield world.finish({energy, agent: this.agent.name})
        }
    }

    class AddNormalSoap extends pddlActionIntention {
        static parameters = [];
        static precondition = [ 
            ['charged'],
            ['not tender'],
            ['not washing'],
            ['not soap']
        ];
        static effect = [ 
            ['soap']
        ];
        *exec () {
            yield world.addNormalSoap({agent: this.agent.name})
        }
    }

    class AddTenderSoap extends pddlActionIntention {
        static parameters = [];
        static precondition = [ 
            ['charged'],
            ['tender'],
            ['not washing'],
            ['not soap']
        ];
        static effect = [ 
            ['soap']
        ];
        *exec () {
            yield world.addTenderSoap({agent: this.agent.name})
        }
    }

    class RetryGoal extends Goal {}
    class RetryFourTimesIntention extends Intention {
        static applicable (goal) {
            return goal instanceof RetryGoal
        }
        *exec ({goal}=parameters) {
            for(let i=0; i<4; i++) {
                let goalAchieved = yield this.agent.postSubGoal( goal )
                if (goalAchieved)
                    return;
                this.log('wait for something to change on beliefset before retrying for the ' + (i+2) + 'th time goal', goal.toString())
                yield this.agent.beliefs.notifyAnyChange()
            }
        }
    }

    var sensor = (agent) => (value,key,observable) => {
        let predicate = key.split(' ')[0]
        let arg1 = key.split(' ')[1]
        if(predicate == 'dried' || predicate == 'drying' || predicate == 'tender'){
            if (arg1=="dishwasher"){
                return;
            }
        }
        if(predicate == 'cristal_to_rinse'){
            if (arg1!="dishwasher"){
                return;
            }
        }
        if (predicate =='consume_energy'){
            let arg2 = key.split(' ')[2]
            if (arg1==agent.name)
                key = predicate+' '+arg2;
            else
                return;
        }
        else if(predicate!='free_energy')
            if (arg1==agent.name)
                key = predicate
            else
                return;
        value?agent.beliefs.declare(key):agent.beliefs.undeclare(key)
    }
    
    {
        let a1 = new Agent('washingMachine')
        world.beliefs.observeAny( sensor(a1) )
        let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Start, PreWash, Charge, Discharge, Finish, AddNormalSoap, AddTenderSoap, StartDry, FinishDry])
        a1.intentions.push(OnlinePlanning)
        a1.intentions.push(RetryFourTimesIntention)
        a1.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['dried'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
    }
    {
        let a2 = new Agent('dishwasher')
        world.beliefs.observeAny( sensor(a2) )
        let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Start, PreWash, Charge, Discharge, Finish, AddNormalSoap, RinseAid])
        a2.intentions.push(OnlinePlanning)
        a2.intentions.push(RetryFourTimesIntention)
        a2.postSubGoal( new RetryGoal( { goal: new PlanningGoal( { goal: [ ['cleaned'], ['not charged'], ['not washing'], ['not soap'], ['free_energy energy'] ] } ) } ) ) // try to achieve the PlanningGoal for 4 times
    }
}


world.beliefs.declare('very_dirty washingMachine')
world.beliefs.declare('tender washingMachine')
world.beliefs.declare('cristal_to_rinse dishwasher')
world.beliefs.declare('free_energy energy')