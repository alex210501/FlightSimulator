
//Import Aws-sdk
const AWS = require('aws-sdk');
//Import express
let express = require('express');

// Create the DynamoDB Client with the region you want
const region = 'us-east-1';
const dynamoDbClient = createDynamoDbClient(region);
function createDynamoDbClient(regionName) {
  // Set the region
  AWS.config.update({region: regionName});
  // Use the following config instead when using DynamoDB Local
  AWS.config.update({region: 'localhost', endpoint: 'http://localhost:8081'});
  return new AWS.DynamoDB();
}
const getItemInput = createGetItemInput();

function createGetItemInput() {
    return {
      "TableName": "Forum",
      "Key": {
        "ForumName": {
          "S": "ForumName"
        }
      }
    }
  }



exports.getTheFlight = async function(req, res){
    const getItemOutput = await dynamoDbClient.getItem(getItemInput).promise();
    console.info('GetItem executed successfully.');
    console.log(getItemOutput);
    console.log(req.params.flightid);
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

