const Beliefset =  require('../utils/Beliefset')
const Observable =  require('../utils/Observable')
const Clock =  require('../utils/Clock')
const Agent = require('../utils/Agent')
const Goal = require('../utils/Goal')
const Intention = require('../utils/Intention')
const House = require('../house/House')
const { BrightnessIntention, BrightnessGoal } = require('../agents/Brightness')
const { HeatingIntention, HeatingGoal } = require('../agents/Heating')





var house = new House()



// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==6 && time.mm==0){
        house.devices.thermostat.status = 18
    }

    if(time.dd>1 && time.dd<5 && time.hh==6 && time.mm==0)
        house.residents.nicola.in_room = house.rooms.kitchen
    if(time.dd>=1 && time.dd<6 && time.hh==7 && time.mm==0)
        house.residents.sara.in_room = house.rooms.kitchen
    if(time.hh==7 && time.mm==0)
        house.residents.frolla.in_room = house.rooms.kitchen

    if(time.dd>1 && time.dd<5 && time.hh==6 && time.mm==15)
        house.residents.nicola.in_room = house.rooms.bathroom
    if(time.dd>=1 && time.dd<6 && time.hh==7 && time.mm==15)
        house.residents.sara.in_room = house.rooms.bathroom
    if(time.hh==8 && time.mm==0)
        house.residents.frolla.in_room = house.rooms.service_bathroom

    if((time.dd==1 || time.dd==5) && time.hh==7 && time.mm==0)
        house.residents.nicola.in_room = house.rooms.kitchen
    if((time.dd==1 || time.dd==5) && time.hh==7 && time.mm==15)
        house.residents.nicola.in_room = house.rooms.bathroom

    if(time.dd>1 && time.dd<5 && time.hh==20 && time.mm==30)
        house.residents.sara.in_room = house.rooms.kitchen
 
    if(time.dd>1 && time.dd<5 && time.hh==21 && time.mm==0){
        house.residents.nicola.in_room = house.rooms.living_room
        house.residents.sara.in_room = house.rooms.living_room
    }

    if(!(time.dd>1 && time.dd<5) && time.hh==19 && time.mm==30){
        house.residents.nicola.in_room = house.rooms.living_room
        house.residents.sara.in_room = house.rooms.living_room
    }
    if(!(time.dd>1 && time.dd<5) && time.hh==20 && time.mm==0){
        house.residents.nicola.in_room = house.rooms.living_room
        house.residents.sara.in_room = house.rooms.living_room
    }

    if(!(time.dd>1 && time.dd<5) && time.hh==12 && time.mm==30)
        house.residents.nicola.in_room = house.rooms.kitchen
    if(!(time.dd>1 && time.dd<5) && time.hh==13 && time.mm==00)
        house.residents.nicola.in_room = house.rooms.living_room
    
    if((time.dd==6 || time.dd==7) && time.hh==12 && time.mm==30)
        house.residents.sara.in_room = house.rooms.kitchen
    if((time.dd==6 || time.dd==7) && time.hh==13 && time.mm==00)
        house.residents.sara.in_room = house.rooms.living_room
})



var brightness_agent = new Agent('brightness_agent')
var heating_agent = new Agent('heating_agent')


brightness_agent.intentions.push(BrightnessIntention)
brightness_agent.postSubGoal(new BrightnessGoal({resident: house.residents.nicola, room: house.rooms.kitchen}))

heating_agent.intentions.push(HeatingIntention)
heating_agent.postSubGoal(new HeatingGoal({thermostat: house.devices.thermostat}))



Clock.startTimer()
Clock.wallClock()