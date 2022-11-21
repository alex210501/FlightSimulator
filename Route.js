//Import express
let express = require('express');

//Import router
let router = express.Router();

//let session = require('express-session');

let FlightFunctions = require('./firstdb');

/*

    - GET the flight by ID
    - GET the route by ID 
    - GET the flightnumber 
    - GET the departure time 
    - GET the plane
    - GET the terminal

 */

router.get('/flight/:flightid', FlightFunctions.getTheFlight);

router.get('/flight/flightroute/:flightid', FlightFunctions.getTheFlightRoute);

router.get('/flight/flightnumber/:flightid', FlightFunctions.getTheFlightNumber);

router.get('/flight/departuretime/:flightid', FlightFunctions.getTheFlightDeparture);

router.get('/flight/plane/:flightid', FlightFunctions.getTheFlightPlane);

router.get('/flight/terminal/:flightid', FlightFunctions.getTheFlightPlaneTerminal);


/*

    - GET the route by ID
    - GET the route's departure airport by name
    - GET the route's arrival airport by name
    - GET the route's flight time by ID

*/
router.get('/route/:routeid', FlightFunctions.getTheRoute);

router.get('/route/departureairport/:routeid', FlightFunctions.getTheRouteDeparture);

router.get('/route/arrivalairport/:routeid', FlightFunctions.getTheRouteArrivalAirport);

router.get('/route/flighttime/:routeid', FlightFunctions.getTheRouteFlightTime);



/*

    - GET the plane by ID
    - GET the company
    - GET the type of the plane

*/
router.get('/plane/:planeid', FlightFunctions.getThePlane);

router.get('/plane/company/:planeid', FlightFunctions.getThePlaneCompany);

router.get('/plane/type/:planeid', FlightFunctions.getThePlaneType);



/*

    - GET an airport by ID
    - GET the name
    - GET the number of terminals

*/
router.get('/airport/:airportid', FlightFunctions.getTheAirport);

router.get('/airport/name/:airportid', FlightFunctions.getTheAirportName);

router.get('/airport/terminalnumber/:airportid', FlightFunctions.getTheAirportTerminalNumber);



//Export router to use it on server.js
module.exports = router;