# House

### Devices
#### BurglarAlarm.js
This file contains the class for the burglar alarm device
The burglar alarm has this observable:
- status
    - on
    - off
#### CatFeeder.js
This file contains the class for the cat feeder device
The cat feeder has this observable:
- status_food
    - empty
    - full
- status_water
    - on
    - off
- cat_prossimity
    - true
    - false
#### CatLitter.js
This file contains the class for the cat litter device
The cat litter has this observable:
- status
    - dirty
    - clean
- cat_position
    - in
    - out
#### Dishwasher.js
This file contains the class for the dishwasher device
The dishwasher has this observable:
- status
    - on
    - off
#### ElectricScooter.js
This file contains the class for the electric scooter device
The electric scooter has this observable:
- status
    - empty_charge
    - half_charge
    - full_charge
- position
    - in_garage
    - out_garage
#### Light.js
This file contains the class for the light device
The light has this observable:
- status
    - on
    - off
#### RollUpShutter.js
This file contains the class for the roll-up shutter device
The roll-up shutter has this observable:
- status
    - lifted
    - lowered
#### Speaker.js
This file contains the class for the speaker device
The speaker has this observable:
- status
    - on
    - off
#### Thermostat.js
This file contains the class for the thermostat device
The thermostat has this observable:
- status
    - from 15 to 23
#### TowelWarmer.js
This file contains the class for the towel warmer device
The towel warmer has this observable:
- status
    - on
    - off
#### WashingMachine.js
This file contains the class for the washing machine device
The washing machine has this observable:
- status
    - on
    - off

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