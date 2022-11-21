
//Import Aws-sdk
const AWS = require('aws-sdk');

// Create the DynamoDB Client with the region you want
const dynamoDbClient = createDynamoDbClient();
function createDynamoDbClient() {
    // Use the following config instead when using DynamoDB Local
    AWS.config.update({region: 'local', endpoint: 'http://localhost:8081'});
    return new AWS.DynamoDB();
}


exports.getTheFlight = async function(req, res){
    //TODO : Change Value to real DB
    const getItemInput = createGetItemInput();
    function createGetItemInput() {
        return {
        "TableName": "Songs",
            "Key": {
                "Id": {"S": "1"},
                "Metadata": {"S": "Month-01-2018"}
            }}}
    const getItemOutput = await dynamoDbClient.getItem(getItemInput).promise();
    //console.log(getItemOutput);
    //console.log(req.params.flightid);
    res.json({getItemOutput})
}
exports.getTheFlightRoute = function(req, res){
    console.log(req.params.flightid);
}
exports.getTheFlightNumber = function(req, res){
    console.log(req.params.flightid);
}
exports.getTheFlightDeparture = function(req, res){
    console.log(req.params.flightid);
}
exports.getTheFlightPlane = function(req, res){
    console.log(req.params.flightid);
}
exports.getTheFlightPlaneTerminal = function(req, res){
    console.log(req.params.flightid);
}



exports.getTheRoute = function(req, res){
    console.log(req.params.routeid);
}
exports.getTheRouteDeparture = function(req, res){
    console.log(req.params.routeid);
}
exports.getTheRouteArrivalAirport = function(req, res){
    console.log(req.params.routeid);
}
exports.getTheRouteFlightTime = function(req, res){
    console.log(req.params.routeid);
}


exports.getThePlane = function(req, res){
    console.log(req.params.planeid);
}
exports.getThePlaneCompany = function(req, res){
    console.log(req.params.planeid);
}
exports.getThePlaneType = function(req, res){
    console.log(req.params.planeid);
}


exports.getTheAirport = function(req, res){
    console.log(req.params.airportid);
}
exports.getTheAirportName = function(req, res){
    console.log(req.params.airportid);
}
exports.getTheAirportTerminalNumber = function(req, res){
    console.log(req.params.airportid);
}