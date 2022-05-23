const Person = require("../residents/Person")
const Cat = require("../residents/Cat")
const ElectricScooter = require("../devices/ElectricScooter")
const TowelWarmer = require("../devices/TowelWarmer")
const Dishwasher = require("../devices/Dishwasher")
const WashingMachine = require("../devices/WashingMachine")
const CatFeeder = require("../devices/CatFeeder")
const CatLitter = require("../devices/CatLitter")
const BurglarAlarm = require("../devices/BurglarAlarm")
const Thermostat = require("../devices/Thermostat")
const Light = require("../devices/Light")
const Speaker = require("../devices/Speaker")
const RollUpShutter = require("../devices/RollUpShutter")
const Room = require("../room/Room")
const Electricity = require("../utilities/Electricity")
const chalk = require('chalk');


class House {

    constructor () {
        let bedroom = new Room('bedroom')

        this.residents = {
            nicola: new Person(this, 'Nicola', {in_room: bedroom}),
            sara: new Person(this, 'Sara', {in_room: bedroom}),
            frolla: new Cat(this, "Frolla", {in_room: bedroom})
        }
        this.rooms = {
            kitchen: new Room('kitchen'),
            corridor: new Room('corridor'),
            living_room: new Room('living_room'),
            bedroom: bedroom,
            bathroom: new Room('bathroom'),
            office: new Room('office'),
            service_bathroom: new Room('service_bathroom'),
            stairs: new Room('stairs'),
            laundry: new Room('laundry'),
            garage: new Room('garage'),
            outside: new Room('outside')
        }
        this.devices = {
            electric_scooter: new ElectricScooter(this, "Sara's scooter"),
            towel_warmer: new TowelWarmer(this, "towel warmer"),
            dishwasher: new Dishwasher(this, "dishwasher"),
            washing_machine: new WashingMachine(this, "washing machine"),
            cat_feeder: new CatFeeder(this, "cat feeder"),
            cat_litter: new CatLitter(this, "cat litter"),
            burglar_alarm: new BurglarAlarm(this, "burglar alarm"),
            thermostat: new Thermostat(this, "thermostat")
        }
        this.utilities = {
            electricity: new Electricity(this)
        }

        this.setRoomsDoors()
        this.setRoomsDevices()

        this.observeResidents()
        this.observeDevices()
    }

    setRoomsDoors(){
        this.rooms.kitchen.setDoorsTo([
            this.rooms.living_room
        ])
        this.rooms.corridor.setDoorsTo([
            this.rooms.living_room,
            this.rooms.bedroom,
            this.rooms.bathroom,
            this.rooms.office,
            this.rooms.service_bathroom,
            this.rooms.stairs
        ])
        this.rooms.living_room.setDoorsTo([
            this.rooms.corridor,
            this.rooms.kitchen
        ])
        this.rooms.bedroom.setDoorsTo([
            this.rooms.corridor
        ])
        this.rooms.bathroom.setDoorsTo([
            this.rooms.corridor
        ])
        this.rooms.office.setDoorsTo([
            this.rooms.corridor
        ])
        this.rooms.service_bathroom.setDoorsTo([
            this.rooms.corridor
        ])
        this.rooms.laundry.setDoorsTo([
            this.rooms.stairs
        ])
        this.rooms.garage.setDoorsTo([
            this.rooms.stairs,
            this.rooms.outside
        ])
        this.rooms.outside.setDoorsTo([
            this.rooms.living_room,
            this.rooms.garage
        ])
        this.rooms.stairs.setDoorsTo([
            this.rooms.garage,
            this.rooms.laundry,
            this.rooms.corridor
        ])
    }

    setRoomsDevices(){
        this.rooms.kitchen.setDevices({
            light: new Light(this, this.rooms.kitchen.getName()+' light'),
            rollUpShutter: new RollUpShutter(this, this.rooms.kitchen.getName()+' roll up shutter'),
            speaker: new Speaker(this, this.rooms.kitchen.getName()+' speaker')
        })

        this.rooms.living_room.setDevices({
            light: new Light(this, this.rooms.living_room.getName()+' light'),
            rollUpShutter: new RollUpShutter(this, this.rooms.living_room.getName()+' roll up shutter'),
            speaker: new Speaker(this, this.rooms.living_room.getName()+' speaker')
        })

        this.rooms.corridor.setDevices({
            light: new Light(this, this.rooms.corridor.getName()+' light')
        })

        this.rooms.bedroom.setDevices({
            light: new Light(this, this.rooms.bedroom.getName()+' light'),
            rollUpShutter: new RollUpShutter(this, this.rooms.bedroom.getName()+' roll up shutter'),
            speaker: new Speaker(this, this.rooms.bedroom.getName()+' speaker')
        })

        this.rooms.bathroom.setDevices({
            light: new Light(this, this.rooms.bathroom.getName()+' light'),
            rollUpShutter: new RollUpShutter(this, this.rooms.bathroom.getName()+' roll up shutter'),
            speaker: new Speaker(this, this.rooms.bathroom.getName()+' speaker')
        })

        this.rooms.office.setDevices({
            light: new Light(this, this.rooms.office.getName()+' light'),
            rollUpShutter: new RollUpShutter(this, this.rooms.office.getName()+' roll up shutter'),
            speaker: new Speaker(this, this.rooms.office.getName()+' speaker')
        })

        this.rooms.service_bathroom.setDevices({
            light: new Light(this, this.rooms.service_bathroom.getName()+' light'),
            rollUpShutter: new RollUpShutter(this, this.rooms.service_bathroom.getName()+' roll up shutter'),
            speaker: new Speaker(this, this.rooms.service_bathroom.getName()+' speaker')
        })

        this.rooms.stairs.setDevices({
            light: new Light(this, this.rooms.stairs.getName()+' light')
        })

        this.rooms.laundry.setDevices({
            light: new Light(this, this.rooms.laundry.getName()+' light'),
            speaker: new Speaker(this, this.rooms.laundry.getName()+' speaker')
        })

        this.rooms.garage.setDevices({
            light: new Light(this, this.rooms.garage.getName()+' light'),
            speaker: new Speaker(this, this.rooms.garage.getName()+' speaker')
        })
    }

    observeResidents(){
        this.residents.nicola.observe('in_room', (v, k)=>console.log(chalk['green']('Nicola moved to ' + v.name)) )

        this.residents.sara.observe('in_room', (v, k)=>console.log(chalk['blue']('Sara moved to ' + v.name)) )

        this.residents.frolla.observe('in_room', (v, k)=>console.log(chalk['yellow']('frolla moved to ' + v.name)) )
    }

    observeDevices(){
        this.devices.burglar_alarm.observe('status', (v, k)=>console.log(chalk['magenta']('burglar alarm status: '+v)))
        
        this.devices.cat_feeder.observe('status_food', (v, k)=>console.log(chalk['magenta']('cat feeder status_food: '+v)))
        this.devices.cat_feeder.observe('status_water', (v, k)=>console.log(chalk['magenta']('cat feeder status_water: '+v)))
        this.devices.cat_feeder.observe('cat_prossimity', (v, k)=>console.log(chalk['magenta']('cat feeder cat_prossimity: '+v)))

        this.devices.cat_litter.observe('status', (v, k)=>console.log(chalk['magenta']('cat litter status: '+v)))
        this.devices.cat_litter.observe('cat_position', (v, k)=>console.log(chalk['magenta']('cat litter cat_position: '+v)))

        this.devices.dishwasher.observe('status', (v, k)=>console.log(chalk['magenta']('dishwasher status: '+v)))

        this.devices.electric_scooter.observe('status', (v, k)=>console.log(chalk['magenta']('electric scooter status: '+v)))
        this.devices.electric_scooter.observe('position', (v, k)=>console.log(chalk['magenta']('electric scooter position: '+v)))
        
        this.devices.thermostat.observe('status', (v, k)=>console.log(chalk['magenta']('thermostat status: '+v)))

        this.devices.towel_warmer.observe('status', (v, k)=>console.log(chalk['magenta']('towel warmer status: '+v)))

        this.devices.washing_machine.observe('status', (v, k)=>console.log(chalk['magenta']('washing machine status: '+v)))
    }

    catSchedule(time){
        if(time.hh==7 && time.mm==0){
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.living_room)
            this.residents.frolla.moveTo(this.rooms.kitchen)
            setTimeout(() => {
                this.devices.cat_feeder.catEatAndDrink()
            }, 10, this);
        }
        
        if(time.hh==8 && time.mm==0){
            this.residents.frolla.moveTo(this.rooms.living_room)
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.service_bathroom)
            setTimeout(() => {
                this.devices.cat_litter.catUseLitter()
            }, 5, this);
        }

        if(time.hh==8 && time.mm==15){
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.living_room)
        }

        if(time.hh==12 && time.mm==30){
            this.residents.frolla.moveTo(this.rooms.kitchen)
            setTimeout(() => {
                this.devices.cat_feeder.catEatAndDrink()
            }, 5, this);
        }
        
        if(time.hh==13 && time.mm==0){
            this.residents.frolla.moveTo(this.rooms.living_room)
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.service_bathroom)
            setTimeout(() => {
                this.devices.cat_litter.catUseLitter()
            }, 5, this);
        }

        if(time.hh==13 && time.mm==15){
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.living_room)
        }

        if(time.hh==19 && time.mm==0){
            this.residents.frolla.moveTo(this.rooms.kitchen)
            setTimeout(() => {
                this.devices.cat_feeder.catEatAndDrink()
            }, 5, this);
        }
        
        if(time.hh==19 && time.mm==30){
            this.residents.frolla.moveTo(this.rooms.living_room)
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.service_bathroom)
            setTimeout(() => {
                this.devices.cat_litter.catUseLitter()
            }, 5, this);
        }

        if(time.hh==19 && time.mm==45){
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.living_room)
        }

        if(time.hh==22 && time.mm==45){
            this.residents.frolla.moveTo(this.rooms.corridor)
            this.residents.frolla.moveTo(this.rooms.bedroom)
        }
    }

    mondayFridayNicolaSchedule(time){
        if((time.dd==1 || time.dd==5) && time.hh==7 && time.mm==0){
            this.devices.thermostat.changeTemperture(20)
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.kitchen)
        }
        if((time.dd==1 || time.dd==5) && time.hh==7 && time.mm==15){
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.bathroom)
        }
    
        if((time.dd==1 || time.dd==5) && time.hh==7 && time.mm==45){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.office)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==12 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.kitchen)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==13 && time.mm==0){
            this.residents.nicola.moveTo(this.rooms.living_room)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==13 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.kitchen)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==14 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.office)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==19 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.kitchen)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==20 && time.mm==0){
            this.residents.nicola.moveTo(this.rooms.living_room)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==22 && time.mm==15){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.bathroom)
        }
    
        if((time.dd == 1 || time.dd == 5) && time.hh==22 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.bedroom)
            this.devices.thermostat.changeTemperture(19)
        }
    }

    tueWedThurNicolaSchedule(time){
        if(time.dd>1 && time.dd<5 && time.hh==6 && time.mm==0){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.kitchen)
        }
    
        if(time.dd>1 && time.dd<5 && time.hh==6 && time.mm==15){
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.bathroom)
        }
    
        if(time.dd>1 && time.dd<5 && time.hh==6 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.outside)
        }
    
        if(time.dd>1 && time.dd<5 && time.hh==19 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.living_room)
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.bathroom)
        }
    
        if(time.dd>1 && time.dd<5 && time.hh==20 && time.mm==0){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.living_room)
        }
        
        if(time.dd>1 && time.dd<5 && time.hh==22 && time.mm==15){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.bathroom)
        }
    
        if(time.dd>1 && time.dd<5 && time.hh==22 && time.mm==30){
            this.residents.nicola.moveTo(this.rooms.corridor)
            this.residents.nicola.moveTo(this.rooms.bedroom)
        }
    }

    workdaysSaraSchedule(time){
        if(time.dd>=1 && time.dd<6 && time.hh==7 && time.mm==0){
            this.residents.sara.moveTo(this.rooms.corridor)
            this.residents.sara.moveTo(this.rooms.living_room)
            this.residents.sara.moveTo(this.rooms.kitchen)
        }
    
        if(time.dd>=1 && time.dd<6 && time.hh==7 && time.mm==15){
            this.residents.sara.moveTo(this.rooms.living_room)
            this.residents.sara.moveTo(this.rooms.corridor)
            this.residents.sara.moveTo(this.rooms.bathroom)
        }

        if(time.dd>=1 && time.dd<6 && time.hh==7 && time.mm==30){
            this.residents.sara.moveTo(this.rooms.corridor)
            this.residents.sara.moveTo(this.rooms.stairs)
            this.residents.sara.moveTo(this.rooms.garage)
            this.devices.electric_scooter.taken()
            this.residents.sara.moveTo(this.rooms.outside)
        }

        if(time.dd>=1 && time.dd<6 && time.hh==16 && time.mm==30){
            this.devices.electric_scooter.released()
            this.residents.sara.moveTo(this.rooms.garage)
            this.residents.sara.moveTo(this.rooms.stairs)
            this.residents.sara.moveTo(this.rooms.corridor)
            this.residents.sara.moveTo(this.rooms.bathroom)
        }

        if(time.dd>=1 && time.dd<6 && time.hh==17 && time.mm==0){
            this.residents.sara.moveTo(this.rooms.corridor)
            this.residents.sara.moveTo(this.rooms.living_room)
        }

        if(time.dd>=1 && time.dd<6 && time.hh==19 && time.mm==30){
            this.residents.sara.moveTo(this.rooms.kitchen)
        }
    
        if(time.dd>=1 && time.dd<6 && time.hh==20 && time.mm==0){
            this.residents.sara.moveTo(this.rooms.living_room)
        }
    }
}

module.exports = House