
//Import Aws-sdk
const AWS = require('aws-sdk');
const { json } = require('body-parser');

// Create the DynamoDB Client with the region you want
const dynamoDbClient = createDynamoDbClient();
function createDynamoDbClient() {
    // Use the following config instead when using DynamoDB Local
    AWS.config.update({region: 'local', endpoint: 'http://localhost:8081'});
    return new AWS.DynamoDB();
}


exports.getTheFlight = async function(req, res){
    const queryInput = createQueryInput(req.params.flightid);
     // Call DynamoDB's query API
    executeQuery(dynamoDbClient, queryInput).then(() => {
        console.info('Query API call has been executed.')
        }
    );
    function createQueryInput(req) {
        return {
          "TableName": "FLIGHT-SIMULATOR",
          "ScanIndexForward": true,
          "ConsistentRead": false,
          "KeyConditionExpression": "#2bb00 = :2bb00",
          "FilterExpression": "#2bb01 = :2bb01",
          "ExpressionAttributeValues": {
            ":2bb00": {
              "S": "FLIGHT"
            },
            ":2bb01": {
              "S": req.slice(1).toString()
            }
          },
          "ExpressionAttributeNames": {
            "#2bb00": "PK",
            "#2bb01": "FlightNumber"
          }
        }
    }
      
      async function executeQuery(dynamoDbClient, queryInput) {
        // Call DynamoDB's query API
        try {
          const queryOutput = await dynamoDbClient.query(queryInput).promise();
          console.info('Query successful.');
          res.json(queryOutput);
        } catch (err) {
          handleQueryError(err);
        }
    }
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



function handleGetItemError(err) {
    if (!err) {
      console.error('Encountered error object was empty');
      return;
    }
    if (!err.code) {
      console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
      return;
    }
    // here are no API specific errors to handle for GetItem, common DynamoDB API errors are handled below
    handleCommonErrors(err);
  }
  
  function handleCommonErrors(err) {
    switch (err.code) {
      case 'InternalServerError':
        console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
        return;
      case 'ProvisionedThroughputExceededException':
        console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off. `
          + `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
        return;
      case 'ResourceNotFoundException':
        console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
        return;
      case 'ServiceUnavailable':
        console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
        return;
      case 'ThrottlingException':
        console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
        return;
      case 'UnrecognizedClientException':
        console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying. `
          + `Error: ${err.message}`);
        return;
      case 'ValidationException':
        console.error(`The input fails to satisfy the constraints specified by DynamoDB, `
          + `fix input before retrying. Error: ${err.message}`);
        return;
      case 'RequestLimitExceeded':
        console.error(`Throughput exceeds the current throughput limit for your account, `
          + `increase account level throughput before retrying. Error: ${err.message}`);
        return;
      default:
        console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
        return;
    }
  }