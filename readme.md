# House

### Devices
#### CatFeeder.js
This file contains the class for the cat feeder device
Observables:
- status_food
    - empty
    - full
- status_water
    - on
    - off
- cat_prossimity
    - true
    - false

Methods:
- getFoodFromCatFeeder()
    - fill the food bowl while consuming energy
- turnOnWater()
    - turn on the water while using energy and power load
- turnOffWater()
    - turn off the water and free the power load
- catEatAndDrink()
    - the cat is near and the food bowl is empty after some time

#### CatLitter.js
This file contains the class for the cat litter device
Observables:
- status
    - dirty
    - clean
- cat_position
    - in
    - out
Methods:
- cleanCatLitter()
    - clean the litter and use energy
- catUseLitter()
    - the cat is in the litter and the litter is dirty after some time
#### Dishwasher.js
This file contains the class for the dishwasher device
The dishwasher has this observable:
- status
    - idle
    - started
    - finished
    - rinseAid
    - preWash
    - charge
    - discharge
    - addSoap
- charged
    - range from 0 to $\infty$
- cristals
    - false
    - true
Methods:
- setDirtyDishes(cristal=false)
    - increas charged observabl by 1 (it can be seen as manually charging the dishes) and update cristal observable
- switchOnDishwasher()
    - start the dishwasher
- switchOffDishwasher()
    - stop (finish) the dishwasher
- rinseAid()
    - use the rinse aid on the dishes
- preWash()
    - do a pre wash cycle
- charge()
    - automatically charge the dishes
- discharge()
    - automatically discharge the dishes
- addSoap()
    - add the soap into the dishwasher
#### ElectricScooter.js
This file contains the class for the electric scooter device
Observables:
- status
    - empty_charge
    - half_charge
    - full_charge
- position
    - in_garage
    - out_garage
Methods:
- chargeScooter()
    - charge the scooter and use energy
- taken()
    - the scooter is out of garage
- released()
    - the scooter is back to garage
#### Light.js
This file contains the class for the light device
Observables:
- status
    - on
    - off
Methods:
- switchOnLight()
    - switch on the light and use energy
- switchOffLight()
    - switch off the light
#### RollUpShutter.js
This file contains the class for the roll-up shutter device
Observables:
- status
    - lifted
    - lowered
Methods:
- liftUpShutter()
    - lift the shutter up and use energy
- lowDownShutter()
    - low the shutter down and use energy
#### Thermostat.js
This file contains the class for the thermostat device
Observables:
- status
    - from 15 to 23
Methods:
- increaseTemperature()
    - increase the thermostat temperature by 1 degree
- decreaseTemperature()
    - decrease the thermostat temperature by 1 degree
- changeTemperature(degrees)
    - change the thermostat temperature by the degree passed as parameters
#### TowelWarmer.js
This file contains the class for the towel warmer device
Observables:
- status
    - on
    - off
Methods:
- switchOnTowelWarmer()
    - switch on the towel warmer, use energy and power load
- switchOffTowelWarmer()
    - switch off the towel warmer and release the power load
#### WashingMachine.js
This file contains the class for the washing machine device
Observables:
- status
    - idle
    - started
    - finished
    - preWash
    - startDry
    - finishDry
    - charge
    - discharge
    - addNormalSoap
    - addTenderSoap
- charged
    - range from 0 to $\infty$
- tender
    - false
    - true
Methods:
- setDirtyClothes(tender=false)
    - increas charged observable by 1 (it can be seen as manually charging the clothes) and update tender observable
- switchOnWashingMachine()
    - start the washing machine
- switchOffWashingMachine()
    - stop (finish) the washing machine
- preWash()
    - do a pre wash cycle
- startDry()
    - start drying clothes
- finishDry()
    - finish drying clothes
- charge()
    - automatically charge the clothes
- discharge()
    - automatically discharge the clothes
- addNormalSoap()
    - add the soap into the washing machine
- addTenderSoap()
    - add the soap for tender clothes into the washing machine

### Goal Intentions
#### Brightness.js
This file contains the class for the brightness intention and goal.
The brightness intention observe the room the residents (persons) of the house are in, in order to switch on and switch off the lights
#### CatNeeding.js
This file contains the class for the cat needing intention and goal.
The cat needing intention observe the cat feeder so that when the cat prossimity is true, the cat feeder will either turn water on and full the bowl of food
#### Heating.js
This file contains the class for the heating intention and goal.
The heating intention observe the thermostat so that when temperature goes under 19°C then it increment by 1°C the temperature

### House
#### House.js
The class for the house

### My World
#### Scenario.js
The file that offer a scenario to test.
In this scenario there are three agents:
- brightness_agent
- heating_agent
- catNeedings_agent

This scenario simulate a week schedule of the residents and test the goal of brightness (lifting the shutters and switching on the lights) the goal of heating and the goal of cat needing (food and water)

### Residents
#### Person.js
The class for the persons resident in the house

#### Cat.js
The class for cats owned by residents

### Room
#### Room.js
The class for the rooms

### Utilities
#### Electricity.js
The class for electricity utility

### Utils
Here we can find the provided framework.
The Clock.js file has been modified to print all the hours on the file