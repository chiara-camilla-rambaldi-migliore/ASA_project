const pddlActionIntention = require('../pddl/actions/pddlActionIntention')

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
            await new Promise(res=>setTimeout(res,10))
        }
        else
            throw new Error('pddl precondition not valid'); //Promise is rejected!
    }

}

class F_RinseAid extends FakeAction {
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

class F_Start extends FakeAction {
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

class F_PreWash extends FakeAction {
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

class F_StartDry extends FakeAction {
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

class F_FinishDry extends FakeAction {
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

class F_Charge extends FakeAction {
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

class F_Discharge extends FakeAction {
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

class F_Finish extends FakeAction {
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

class F_AddNormalSoap extends FakeAction {
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

class F_AddTenderSoap extends FakeAction {
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

module.exports = { F_RinseAid, F_Start, F_PreWash, F_Charge, F_Discharge, F_Finish, F_AddNormalSoap, F_AddTenderSoap, F_StartDry, F_FinishDry }