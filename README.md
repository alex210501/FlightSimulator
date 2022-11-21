# FlightSimulator


## :airplane: API requests descriptions   

### :sunglasses: The flight

A flight will contain :

- a route
- the flightnumber
- the departure time
- the plane
- the terminal ( of the plane's current airport)  

For the flight the API will do this :

- GET the flight by ID
- GET the route by ID 
- GET the flightnumber 
- GET the departure time 
- GET the plane
- GET the terminal

-> app.get('/flight/:parameter') and then redirected to '/'

Where parameter will be the flight's ID

### :cloud: The Routes    

A route will contain :  


- the departure place ( airport)
- the arrival place ( airport)
- the time of the flight 

For the route the API will do this :

- GET the route by ID
- GET the route's departure airport by name
- GET the route's arrival airport by name
- GET the route's flight time by ID

-> app.get('/route/:parameter') and then redirected to '/'

Where parameter will be the route's ID

### :airplane: The plane

The plane will contain :

- The plane's ID
- The company
- The type of the plane

For the plane the API will do this :

- GET the plane by ID
- GET the company
- GET the type of the plane

-> app.get('/plane/:parameter') and then redirected to '/'

Where parameter will be the plane's ID


### :tokyo_tower: The airport

The airport will contain :

- an ID
- a name
- terminals

For the airport the API will do this :

- GET an airport by ID
- GET the name
- GET the number of terminals

-> app.get('/airport/:airportid') and then redirected to '/'

Where parameter will be the airport's name