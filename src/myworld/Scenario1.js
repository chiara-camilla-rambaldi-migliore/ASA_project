const Clock =  require('../utils/Clock')
const Agent = require('../utils/Agent')
const House = require('../house/House')
const { BrightnessWithPresenceIntention, BrightnessWithPresenceGoal, BrightnessWithTimeGoal, BrightnessWithTimeIntention } = require('../goal_intentions/Brightness')
const { HeatingIntention, HeatingGoal, HeatingThermostatGoal, HeatingThermostatIntention} = require('../goal_intentions/Heating')
const { CatFeederGoal, CatFeederIntention, CatLitterGoal, CatLitterIntention } = require('../goal_intentions/CatNeeding')
const Temperature = require('../utils/Temperature');
const { ShowerGoal, ShowerIntention } = require('../goal_intentions/Shower')
const { WashingGoal, WashingIntention } = require('../goal_intentions/Washing')
const { F_RinseAid, F_Start, F_PreWash, F_Charge, F_Discharge, F_Finish, F_AddNormalSoap, F_AddTenderSoap, F_StartDry, F_FinishDry } = require('../planning/FakeActionsPlanning')
const pddlActionIntention = require('../pddl/actions/pddlActionIntention')
const { RetryGoal, RetryFourTimesIntention } = require('../goal_intentions/RetryPlanning')
const { SenseDishesGoal, SenseDishesIntention } = require('../goal_intentions/DishesSensor')
const { SenseClothesGoal, SenseClothesIntention } = require('../goal_intentions/ClothesSensor')
const { SensePowerLoadGoal, SensePowerLoadIntention } = require('../goal_intentions/EnergySensor')
const { SensePersonGoal, SensePersonIntention } = require('../goal_intentions/PersonIntentionsSensor')
const { SenseConsumptionGoal, SenseConsumptionIntention } = require('../goal_intentions/ConsumptionSensor')
const { ScooterChargeGoal, ScooterChargeIntention } = require('../goal_intentions/ScooterCharge')


const house = new House()
const brightness_agent = new Agent('brightness_agent')
const house_agent = new Agent('house_agent')
const catNeedings_agent = new Agent('catNeedings_agent')
const washingMachine_agent = new Agent('washingMachine')
const dishwasher_agent = new Agent('dishwasher')

{

    house_agent.rinseAid = async function ({energy, agent} = args) {
        this.log('rinseAid', energy, agent)
        let rinseAid = new F_RinseAid(house_agent, {energy, agent} )
        if(rinseAid.checkPrecondition()){
            rinseAid.applyEffect()
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.rinseAid failed:', err.message || err); 
            throw err;
        }
    }

    house_agent.start = async function ({energy, agent} = args) {
        this.log('start', energy, agent)
        let start = new F_Start(house_agent, {energy, agent} )
        if(start.checkPrecondition()){
            start.applyEffect()
            await Clock.global.notifyChange('mm', 'planning_start')
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.start failed:', err.message || err); 
            throw err
        }
        // return new Start(house_agent, {energy, agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.start failed:', err.message || err); throw err;})
    }

    house_agent.preWash = async function ({energy, agent} = args) {
        this.log('preWash', energy, agent)
        let start = new F_PreWash(house_agent, {energy, agent} )
        if(start.checkPrecondition()){
            start.applyEffect()
            await Clock.global.notifyChange('mm', 'planning_prewash')
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.prewash failed:', err.message || err); 
            throw err
        }
        // return new F_PreWash(house_agent, {energy, agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.preWash failed:', err.message || err); throw err;})
    }

    house_agent.charge = function ({agent} = args) {
        this.log('charge', agent)
        let charge = new F_Charge(house_agent, {agent} )
        if(charge.checkPrecondition()){
            charge.applyEffect()
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.charge failed:', err.message || err); 
            throw err;
        }
        // return new F_Charge(house_agent, {agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.charge failed:', err.message || err); throw err;})
    }

    house_agent.discharge = function ({agent} = args) {
        this.log('discharge', agent)
        let discharge = new F_Discharge(house_agent, {agent} )
        if(discharge.checkPrecondition()){
            discharge.applyEffect()
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.discharge failed:', err.message || err); 
            throw err;
        }
        // return new F_Discharge(house_agent, {agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.discharge failed:', err.message || err); throw err;})
    }

    house_agent.finish = function ({energy, agent} = args) {
        this.log('finish', energy, agent)
        let finish = new F_Finish(house_agent, {energy, agent} )
        if(finish.checkPrecondition()){
            finish.applyEffect()
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.finish failed:', err.message || err); 
            throw err;
        }
        // return new F_Finish(house_agent, {energy, agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.finish failed:', err.message || err); throw err;})
    }

    house_agent.addNormalSoap = function ({agent} = args) {
        this.log('addNormalSoap', agent)
        let addNormalSoap = new F_AddNormalSoap(house_agent, {agent} )
        if(addNormalSoap.checkPrecondition()){
            addNormalSoap.applyEffect()
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.addNormalSoap failed:', err.message || err); 
            throw err;
        }
        // return new F_AddNormalSoap(house_agent, {agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.addNormalSoap failed:', err.message || err); throw err;})
    }
    
    house_agent.addTenderSoap = function ({agent} = args) {
        this.log('addTenderSoap', agent)
        let addTenderSoap = new F_AddTenderSoap(house_agent, {agent} )
        if(addTenderSoap.checkPrecondition()){
            addTenderSoap.applyEffect()
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.addTenderSoap failed:', err.message || err); 
            throw err;
        }
        // return new F_AddTenderSoap(house_agent, {agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.addTenderSoap failed:', err.message || err); throw err;})
    }

    house_agent.startDry = async function ({energy, agent} = args) {
        this.log('startDry', energy, agent)
        let startDry = new F_StartDry(house_agent, {energy, agent} )
        if(startDry.checkPrecondition()){
            startDry.applyEffect()
            await Clock.global.notifyChange('mm', 'planning_startDry')
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.startDry failed:', err.message || err); 
            throw err;
        }
        // return new F_StartDry(house_agent, {energy, agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.startDry failed:', err.message || err); throw err;})
    }

    house_agent.finishDry = function ({energy, agent} = args) {
        this.log('finishDry', energy, agent)
        let finishDry = new F_FinishDry(house_agent, {energy, agent} )
        if(finishDry.checkPrecondition()){
            finishDry.applyEffect()
        } else {
            let err = new Error('pddl precondition not valid');
            this.error('house_agent.finishDry failed:', err.message || err); 
            throw err;
        }
        // return new F_FinishDry(house_agent, {energy, agent} ).checkPreconditionAndApplyEffect()
        // .catch(err=>{this.error('house_agent.finishDry failed:', err.message || err); throw err;})
    }
}




/**
 * Washing agents
 */

class RinseAid extends pddlActionIntention {
    static parameters = ['energy'];
    static precondition = [ 
        ['not very_dirty'],
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
        yield house_agent.rinseAid({energy, agent: this.agent.name})
        house.devices.dishwasher.rinseAid()
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
        yield house_agent.start({energy, agent: this.agent.name})
        if(this.agent.name == 'dishwasher'){
            house.devices.dishwasher.switchOnDishwasher()
        } else {
            house.devices.washing_machine.switchOnWashingMachine()
        }
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
        yield house_agent.preWash({energy, agent: this.agent.name})
        if(this.agent.name == 'dishwasher'){
            house.devices.dishwasher.preWash()
        } else {
            house.devices.washing_machine.preWash()
        }
        
    }
}

class Charge extends pddlActionIntention {
    static parameters = [];
    static precondition = [ 
        ['not washing'],
        ['not charged'],
        ['not cleaned']
    ];
    static effect = [ 
        ['charged']
    ];
    *exec () {
        yield house_agent.charge({agent: this.agent.name})
        if(this.agent.name == 'dishwasher'){
            house.devices.dishwasher.charge()
        } else {
            house.devices.washing_machine.charge()
        }
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
        yield house_agent.discharge({agent: this.agent.name})
        if(this.agent.name == 'dishwasher'){
            house.devices.dishwasher.discharge()
        } else {
            house.devices.washing_machine.discharge()
        }
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
        yield house_agent.finish({energy, agent: this.agent.name})
        if(this.agent.name == 'dishwasher'){
            house.devices.dishwasher.switchOffDishwasher()
        } else {
            house.devices.washing_machine.switchOffWashingMachine()
        }
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
        yield house_agent.addNormalSoap({agent: this.agent.name})
        if(this.agent.name == 'dishwasher'){
            house.devices.dishwasher.addSoap()
        } else {
            house.devices.washing_machine.addNormalSoap()
        }
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
        yield house_agent.addTenderSoap({agent: this.agent.name})
        house.devices.washing_machine.addTenderSoap()
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
        yield house_agent.startDry({energy, agent: this.agent.name})
        house.devices.washing_machine.startDry()
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
        yield house_agent.finishDry({energy, agent: this.agent.name})
        house.devices.washing_machine.finishDry()
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



brightness_agent.intentions.push(BrightnessWithPresenceIntention)
brightness_agent.intentions.push(BrightnessWithTimeIntention)

brightness_agent.postSubGoal(new BrightnessWithPresenceGoal({resident: house.residents.nicola, rooms: Object.values(house.rooms)}))
brightness_agent.postSubGoal(new BrightnessWithPresenceGoal({resident: house.residents.sara, rooms: Object.values(house.rooms)}))
brightness_agent.postSubGoal(new BrightnessWithTimeGoal({residents: [house.residents.sara, house.residents.nicola]}))


{
    let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Start, PreWash, Charge, Discharge, Finish, AddNormalSoap, AddTenderSoap, StartDry, FinishDry])
    washingMachine_agent.intentions.push(OnlinePlanning)
    washingMachine_agent.intentions.push(RetryFourTimesIntention)
}
{
    let {OnlinePlanning} = require('../pddl/OnlinePlanner')([Start, PreWash, Charge, Discharge, Finish, AddNormalSoap, RinseAid])
    dishwasher_agent.intentions.push(OnlinePlanning)
    dishwasher_agent.intentions.push(RetryFourTimesIntention)
}

catNeedings_agent.intentions.push(CatFeederIntention)
catNeedings_agent.intentions.push(CatLitterIntention)
catNeedings_agent.postSubGoal(new CatFeederGoal({cat_feeder: house.devices.cat_feeder}))
catNeedings_agent.postSubGoal(new CatLitterGoal({cat_litter: house.devices.cat_litter}))


house_agent.beliefs.observeAny( sensor(dishwasher_agent) )
house_agent.beliefs.observeAny( sensor(washingMachine_agent) )

house_agent.intentions.push(HeatingThermostatIntention)
house_agent.intentions.push(HeatingIntention)
house_agent.intentions.push(ScooterChargeIntention)
house_agent.intentions.push(ShowerIntention)
house_agent.intentions.push(WashingIntention)
house_agent.intentions.push(SenseDishesIntention)
house_agent.intentions.push(SenseClothesIntention)
house_agent.intentions.push(SensePowerLoadIntention)
house_agent.intentions.push(SensePersonIntention)
house_agent.intentions.push(SenseConsumptionIntention)

house_agent.postSubGoal(new HeatingThermostatGoal({thermostat: house.devices.thermostat}))
house_agent.postSubGoal(new HeatingGoal({thermostat: house.devices.thermostat}))
house_agent.postSubGoal(new ScooterChargeGoal({scooter: house.devices.electric_scooter}))
house_agent.postSubGoal(new ShowerGoal({towel_warmer: house.devices.towel_warmer, person: house.residents.nicola}))
house_agent.postSubGoal(new ShowerGoal({towel_warmer: house.devices.towel_warmer, person: house.residents.sara}))
house_agent.postSubGoal(new WashingGoal({dishWasher: dishwasher_agent, washingMachine: washingMachine_agent}))
house_agent.postSubGoal(new SenseDishesGoal({dishwasher: house.devices.dishwasher}))
house_agent.postSubGoal(new SenseClothesGoal({washingMachine: house.devices.washing_machine}))
house_agent.postSubGoal(new SensePowerLoadGoal({electricity: house.utilities.electricity}))
house_agent.postSubGoal(new SensePersonGoal({person: house.residents.nicola}))
house_agent.postSubGoal(new SensePersonGoal({person: house.residents.sara}))
house_agent.postSubGoal(new SenseConsumptionGoal({electricity: house.utilities.electricity}))




// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global

    if(time.dd==1 && time.hh==0 && time.mm==0){
        house_agent.beliefs.declare('cleaned washingMachine')
        house_agent.beliefs.declare('cleaned dishwasher')
    }
    //cat schedule
    house.catSchedule(time)

    //Nicola - monday and friday schedule
    house.mondayFridayNicolaSchedule(time)

    //Nicola - tuesday, wednesday and thursday schedule
    house.tueWedThurNicolaSchedule(time)

    //Sara
    house.workdaysSaraSchedule(time)
    
    //saturday and sunday schedule
    house.satSunSchedule(time)
})



Clock.startTimer()
Clock.wallClock()

Temperature.startTemperatureSensor()
Temperature.wallTemperature()