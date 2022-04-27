class Room {
    constructor (name) {
        this.name = name
        this.doors_to = []
        this.devices = {}
    }

    setDoorsTo(doors_to){
        this.doors_to = doors_to
    }

    setDevices(devices){
        this.devices = devices
        // for (const [key, value] of Object.entries(this.devices)) {
        //     value.observe('status', (v, k)=>console.log(this.name+' '+value.name+' status: '+v))
        // }
    }

    getName(){
        return this.name
    }
}

module.exports = Room