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
[Link to install Node JS](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial). 

Once Node JS is installed in your folder, you can start the server by enterring this command in a terminal : 
- `cd .\FlightSimulator\ `
- `node .\server.js` or `npm start`  

You'll find the port on which the server is running in the file [server.js](./server.js). By default we putted it on the port : `8023`.

Also you'll find in the file [FlightFunctions.js](FlightFunctions.js) that the communication with the Amazon DynamoDB is running on the port : `8000`.

## :airplane: API requests descriptions   

### :sunglasses: The flight

A flight will contain :

- The departure time
- The plane
- the terminal
- the route

Request for the flight that contains also the route, the departure and the arrival airports :

- GET the flight by ID => `/flight/:flightnumber`

Where the parameter flightnumber will be for example : `FR4855`

### :airplane: The plane

The plane will contain :

- The company
- The type of the plane

Request for the plane that also contains the plane-type and the company :

- GET the plane by plane number => `/plane/:planenumber`

Where the parameter planenumber will be for example : `0`


### :tokyo_tower: The flights, airports and departure time

The airport will contain :

- A name
- An acronym
- A country
- A city
- Terminals

Request to get the flightdeparture by time departure in parameter :

- GET the flights by departure time : `/flight/departuretime/:time`

Where the parameter time will be for example : `0` or `100` or `200`

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