//Import express
let express = require('express');

//Import router
let router = express.Router();

let FlightFunctions = require('./FlightFunctions.js');


/*
    * Flight avec la route et les deux aéroports
    * Un plane avec tout le plane type et la ompagnie
    * Garder la convention du 'J'
*/
/*

    - GET the flight by ID
    - GET the route by ID 
    - GET the flightnumber 
    - GET the departure time 
    - GET the plane
    - GET the terminal

 */

router.get('/flight/:flightnumber', FlightFunctions.getTheFlight);

//router.get('/flight/flightroute/:flightnumber', FlightFunctions.getTheFlightRoute);

//router.get('/flight/flightnumber/:flightnumber', FlightFunctions.getTheFlightNumber);

router.get('/flight/departuretime/:time', FlightFunctions.getTheFlightDeparture);

//router.get('/flight/plane/:flightnumber', FlightFunctions.getTheFlightPlane);

//router.get('/flight/terminal/:flightnumber', FlightFunctions.getTheFlightPlaneTerminal);


/*

    - GET the route by ID
    - GET the route's departure airport by name
    - GET the route's arrival airport by name
    - GET the route's flight time by ID

*/
/*
router.get('/route/:routeid', FlightFunctions.getTheRoute);

router.get('/route/departureairport/:routeid', FlightFunctions.getTheRouteDeparture);

router.get('/route/arrivalairport/:routeid', FlightFunctions.getTheRouteArrivalAirport);

router.get('/route/flighttime/:routeid', FlightFunctions.getTheRouteFlightTime);
*/


/*

    - GET the plane by ID
    - GET the company
    - GET the type of the plane

*/

router.get('/plane/:planenumber', FlightFunctions.getThePlane);

//router.get('/plane/company/:planenumber', FlightFunctions.getThePlaneCompany);

//router.get('/plane/type/:planenumber', FlightFunctions.getThePlaneType);



/*

    - GET an airport by ID
    - GET the name
    - GET the number of terminals

*/

/*
router.get('/airport/:airportacronym', FlightFunctions.getTheAirport);

router.get('/airport/name/:airportacronym', FlightFunctions.getTheAirportName);

router.get('/airport/terminalnumber/:airportacronym', FlightFunctions.getTheAirportTerminalNumber);
*/

//Export router to use it on server.js
module.exports = router;