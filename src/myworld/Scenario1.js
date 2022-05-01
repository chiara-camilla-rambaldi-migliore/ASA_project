const Clock =  require('../utils/Clock')
const Agent = require('../utils/Agent')
const House = require('../house/House')
const { BrightnessIntention, BrightnessGoal } = require('../goal_intentions/Brightness')
const { HeatingIntention, HeatingGoal } = require('../goal_intentions/Heating')
const { CatNeedingIntention, CatNeedingGoal } = require('../goal_intentions/CatNeeding')





var house = new House()



// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    //everyday schedule
    if(time.hh==6 && time.mm==0){
        house.devices.thermostat.status = 18
    }
    if(time.hh==7 && time.mm==0){
        house.residents.frolla.in_room = house.rooms.kitchen
        house.devices.cat_feeder.status_food = 'empty'
        house.devices.cat_feeder.status_water = 'off'
        house.devices.cat_feeder.cat_prossimity = true
        setTimeout(() => {
            house.devices.cat_feeder.cat_prossimity = false
        }, 5, house);
    }
    
    if(time.hh==8 && time.mm==0){
        house.residents.frolla.in_room = house.rooms.service_bathroom
    }

    //monday and friday schedule
    if((time.dd==1 || time.dd==5) && time.hh==7 && time.mm==0)
        house.residents.nicola.in_room = house.rooms.kitchen
    if((time.dd==1 || time.dd==5) && time.hh==7 && time.mm==15)
        house.residents.nicola.in_room = house.rooms.bathroom

    // monday, friday, saturday and sunday
    if(!(time.dd>1 && time.dd<5) && time.hh==12 && time.mm==30)
        house.residents.nicola.in_room = house.rooms.kitchen

    if(!(time.dd>1 && time.dd<5) && time.hh==13 && time.mm==00)
        house.residents.nicola.in_room = house.rooms.living_room

    if(!(time.dd>1 && time.dd<5) && time.hh==19 && time.mm==30){
        house.residents.nicola.in_room = house.rooms.kitchen
        house.residents.sara.in_room = house.rooms.kitchen
    }
    if(!(time.dd>1 && time.dd<5) && time.hh==20 && time.mm==0){
        house.residents.nicola.in_room = house.rooms.living_room
        house.residents.sara.in_room = house.rooms.living_room
    }

    //tuesday, wednesday and thursday schedule

    if(time.dd>1 && time.dd<5 && time.hh==6 && time.mm==0)
        house.residents.nicola.in_room = house.rooms.kitchen
    if(time.dd>=1 && time.dd<6 && time.hh==7 && time.mm==0)
        house.residents.sara.in_room = house.rooms.kitchen

    if(time.dd>1 && time.dd<5 && time.hh==6 && time.mm==15)
        house.residents.nicola.in_room = house.rooms.bathroom
    if(time.dd>=1 && time.dd<6 && time.hh==7 && time.mm==15)
        house.residents.sara.in_room = house.rooms.bathroom

    if(time.dd>1 && time.dd<5 && time.hh==20 && time.mm==30)
        house.residents.sara.in_room = house.rooms.kitchen
 
    if(time.dd>1 && time.dd<5 && time.hh==21 && time.mm==0){
        house.residents.nicola.in_room = house.rooms.living_room
        house.residents.sara.in_room = house.rooms.living_room
    }

    
    //saturday and sunday schedule
    if((time.dd==6 || time.dd==7) && time.hh==8 && time.mm==00){
        house.residents.sara.in_room = house.rooms.kitchen
        house.residents.nicola.in_room = house.rooms.kitchen
    }
    if((time.dd==6 || time.dd==7) && time.hh==12 && time.mm==30){
        house.residents.sara.in_room = house.rooms.kitchen
        house.residents.nicola.in_room = house.rooms.kitchen
    }
    if((time.dd==6 || time.dd==7) && time.hh==13 && time.mm==00){
        house.residents.sara.in_room = house.rooms.living_room
        house.residents.nicola.in_room = house.rooms.living_room
    }
})



var brightness_agent = new Agent('brightness_agent')
var heating_agent = new Agent('heating_agent')
var catNeedings_agent = new Agent('catNeedings_agent')


brightness_agent.intentions.push(BrightnessIntention)
brightness_agent.postSubGoal(new BrightnessGoal({resident: house.residents.nicola, rooms: Object.values(house.rooms)}))

brightness_agent.intentions.push(BrightnessIntention)
brightness_agent.postSubGoal(new BrightnessGoal({resident: house.residents.sara, rooms: Object.values(house.rooms)}))

heating_agent.intentions.push(HeatingIntention)
heating_agent.postSubGoal(new HeatingGoal({thermostat: house.devices.thermostat}))

catNeedings_agent.intentions.push(CatNeedingIntention)
catNeedings_agent.postSubGoal(new CatNeedingGoal({cat_feeder: house.devices.cat_feeder}))



Clock.startTimer()
Clock.wallClock()