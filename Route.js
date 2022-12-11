//Import express
let express = require('express');

//Import router
let router = express.Router();

let FlightFunctions = require('./FlightFunctions.js');

// Request for the flight that contains also the route, the departure and the arrival airports
router.get('/flight/:flightnumber', FlightFunctions.getTheFlight);

// Request for the plane that also contains the plane-type and the company
router.get('/flight/departuretime/:time', FlightFunctions.getTheFlightDeparture);

// Request for the plane that also contains the plane-type and the company
router.get('/plane/:planenumber', FlightFunctions.getThePlane);

//Export router to use it on server.js
module.exports = router;