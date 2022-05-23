const Clock =  require('../utils/Clock')
const Agent = require('../utils/Agent')
const House = require('../house/House')
const { BrightnessIntention, BrightnessGoal } = require('../goal_intentions/Brightness')
const { HeatingIntention, HeatingGoal, HeatingThermostatGoal, HeatingThermostatIntention} = require('../goal_intentions/Heating')
const { CatFeederGoal, CatFeederIntention, CatLitterGoal, CatLitterIntention } = require('../goal_intentions/CatNeeding')
const Temperature = require('../utils/Temperature');





var house = new House()



// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    //everyday schedule
    // if(time.hh==6 && time.mm==0){
    //     house.devices.thermostat.status = 19
    // }

    //cat schedule
    house.catSchedule(time)

    //Nicola - monday and friday schedule
    house.mondayFridayNicolaSchedule(time)

    //Nicola - tuesday, wednesday and thursday schedule
    house.tueWedThurNicolaSchedule(time)

    //Sara
    house.workdaysSaraSchedule(time)
    
    //saturday and sunday schedule
    if((time.dd==6 || time.dd==7) && time.hh==8 && time.mm==00){
        house.residents.nicola.moveTo(house.rooms.corridor)
        house.residents.nicola.moveTo(house.rooms.living_room)
        house.residents.nicola.moveTo(house.rooms.kitchen)
        house.residents.sara.moveTo(house.rooms.corridor)
        house.residents.sara.moveTo(house.rooms.living_room)
        house.residents.sara.moveTo(house.rooms.kitchen)
    }

    if((time.dd==6 || time.dd==7) && time.hh==8 && time.mm==45){
        house.residents.nicola.moveTo(house.rooms.living_room)
        house.residents.nicola.moveTo(house.rooms.corridor)
        house.residents.nicola.moveTo(house.rooms.bathroom)
        house.residents.sara.moveTo(house.rooms.living_room)
        house.residents.sara.moveTo(house.rooms.corridor)
        house.residents.sara.moveTo(house.rooms.bathroom)
    }

    if((time.dd==6 || time.dd==7) && time.hh==12 && time.mm==30){
        house.residents.nicola.moveTo(house.rooms.corridor)
        house.residents.nicola.moveTo(house.rooms.living_room)
        house.residents.nicola.moveTo(house.rooms.kitchen)
        house.residents.sara.moveTo(house.rooms.corridor)
        house.residents.sara.moveTo(house.rooms.living_room)
        house.residents.sara.moveTo(house.rooms.kitchen)
    }
    if((time.dd==6 || time.dd==7) && time.hh==13 && time.mm==00){
        house.residents.nicola.moveTo(house.rooms.living_room)
        house.residents.sara.moveTo(house.rooms.living_room)
    }

    if((time.dd==6 || time.dd==7) && time.hh==19 && time.mm==30){
        house.residents.nicola.moveTo(house.rooms.living_room)
        house.residents.nicola.moveTo(house.rooms.kitchen)
        house.residents.sara.moveTo(house.rooms.living_room)
        house.residents.sara.moveTo(house.rooms.kitchen)
    }
    if((time.dd==6 || time.dd==7) && time.hh==20 && time.mm==0){
        house.residents.nicola.moveTo(house.rooms.living_room)
        house.residents.sara.moveTo(house.rooms.living_room)
    }
})



var brightness_agent = new Agent('brightness_agent')
var heating_agent = new Agent('heating_agent')
var catNeedings_agent = new Agent('catNeedings_agent')


brightness_agent.intentions.push(BrightnessIntention)
brightness_agent.postSubGoal(new BrightnessGoal({resident: house.residents.nicola, rooms: Object.values(house.rooms)}))

brightness_agent.intentions.push(BrightnessIntention)
brightness_agent.postSubGoal(new BrightnessGoal({resident: house.residents.sara, rooms: Object.values(house.rooms)}))

heating_agent.intentions.push(HeatingThermostatIntention)
heating_agent.intentions.push(HeatingIntention)
heating_agent.postSubGoal(new HeatingThermostatGoal({thermostat: house.devices.thermostat}))
heating_agent.postSubGoal(new HeatingGoal({thermostat: house.devices.thermostat}))

catNeedings_agent.intentions.push(CatFeederIntention)
catNeedings_agent.intentions.push(CatLitterIntention)
catNeedings_agent.postSubGoal(new CatFeederGoal({cat_feeder: house.devices.cat_feeder}))
catNeedings_agent.postSubGoal(new CatLitterGoal({cat_litter: house.devices.cat_litter}))



Clock.startTimer()
Clock.wallClock()
Temperature.stopTemperatureSensor()
Temperature.wallTemperature()