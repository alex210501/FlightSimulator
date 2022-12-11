# FlightSimulator

## Start DynamoDB

First you have to open a command prompt on your machine and then you should go to the "AmazonDb" folder on your machine.  

For example : `cd C:\Users\hugo2\Documents\MA1\AmazonDb` 

There you should execute this command to start the communication with the Dynamodb :  
   
`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

You may sometime have to delete a table from your DynamoDb connection, for such you can execute this command : 
  
`aws dynamodb delete-table --table-name test --endpoint-url http://localhost:8000`

## :signal_strength: Start the Server

First of all you must have Node JS installed on your computer. To do so I suggest you to follow this tutorial : 
`https://code.visualstudio.com/docs/nodejs/nodejs-tutorial`  

Once Node JS is installed in your folder, you can start the server by enterring this command in a terminal : 
- `cd .\FlightSimulator\ `
- `node .\server.js` or `npm start`  

You'll find the port on which the server is running in the file [server.js](./server.js). By default we putted it on the port : `8023`.

Also you'll find in the file [FlightFunctions.js](FlightFunctions.js) that the communication with the Amazon DynamoDB is running on the port : `8000`.

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

## :books: Database

You can download the database table using the file [database][database-file].

<table>
    <thead>
        <tr>
            <td>Partition Key (PK)</td>
            <td>Sort Key (SK)<td>            
            <th colspan=5>Attributes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        	<td>FLIGHT</td>
            <td>FlightNumber</td>
            <td>DepartureTime</td>
            <td>PlaneNumber</td>
            <td>Terminal</td>
            <td>Route</td>
        </tr>
        <tr>
        	<td>ROUTE</td>
            <td>Route</td>
            <td>DepartureAirport</td>
            <td>ArrivalAirport</td>
            <td>TimeOfFlight</td>
        </tr>
        <tr>
        	<td>PLANE</td>
            <td>PlaneNumber</td>
            <td>Company</td>
            <td>PlaneType</td>
        </tr>
        <tr>
        	<td>COMPANY</td>
            <td>Company</td>
            <td>IATA</td>
            <td>OACI</td>
            <td>CompanyCountry</td>
            <td>PlaneQuantity</td>
        </tr>
        <tr>
        	<td>PLANE-TYPE</td>
            <td>PlaneType</td>
            <td>Constructor</td>
            <td>Model</td>
            <td>PlanePassengers</td>
            <td>CruisingSpeed</td>
            <td>MaxSpeed</td>
        </tr>
        <tr>
        	<td>AIRPORT</td>
            <td>Airport</td>
            <td>AirportAcronym</td>
            <td>AirportCountry</td>
            <td>AirportCountry</td>
            <td>AirportTerminal</td>
        </tr>
    </tbody>
</table>

[database-file]: ./flight-simulator.json