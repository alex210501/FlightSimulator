
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
    /*

    No id in the database?

    */
    }
exports.getTheFlightRoute = async function(req, res){
    /*

    TODO: Move all same function outside, only createQueryInput Stays

    */

    const queryInput = createQueryInput(req.params.flightid);
    // Call DynamoDB's query API
       executeQuery(dynamoDbClient, queryInput).then(() => {
           console.info('Query API call has been executed.')
           }
       );
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

     function createQueryInput(req) {
      return {
        "TableName": "FLIGHT-SIMULATOR",
        "ScanIndexForward": true,
        "ConsistentRead": false,
        "KeyConditionExpression": "#c4882 = :c4882",
        "ProjectionExpression": "#c4880,#c4881",
        "ExpressionAttributeValues": {
          ":c4882": {
            "S": "FLIGHT"
          }
        },
        "ExpressionAttributeNames": {
          "#c4880": req.slice(1).toString(),
          "#c4881": "RouteId",
          "#c4882": "PK"
        }
      }
    }
}

exports.getTheFlightNumber = async function(req, res){
    

    const queryInput = createQueryInput(req.params.flightid);
     // Call DynamoDB's query API
        executeQuery(dynamoDbClient, queryInput).then(() => {
            console.info('Query API call has been executed.')
            }
        );
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
}
exports.getTheFlightDeparture = async function(req, res){
    const queryInput = createQueryInput(req.params.flightid);
     // Call DynamoDB's query API
        executeQuery(dynamoDbClient, queryInput).then(() => {
            console.info('Query API call has been executed.')
            }
        );
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
      function createQueryInput(req) {
        return {
          "TableName": "FLIGHT-SIMULATOR",
          "ScanIndexForward": true,
          "ConsistentRead": false,
          "KeyConditionExpression": "#ffe82 = :ffe82",
          "ProjectionExpression": "#ffe80,#ffe81",
          "ExpressionAttributeValues": {
            ":ffe82": {
              "S": "FLIGHT"
            }
          },
          "ExpressionAttributeNames": {
            "#ffe80": req.slice(1).toString(),
            "#ffe81": "DepartureTime",
            "#ffe82": "PK"
          }
        }
      }
}
exports.getTheFlightPlane = function(req, res){
    console.log(req.params.flightid);
}
exports.getTheFlightPlaneTerminal = function(req, res){
    console.log(req.params.flightid);
}



exports.getTheRoute = function(req, res){
  const queryInput = createQueryInput(req.params.routeid);
  // Call DynamoDB's query API
  executeQuery(dynamoDbClient, queryInput).then(() => {
      console.info('Query API call has been executed.')
      }
   );
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

  function createQueryInput(req) {
    return {
      "TableName": "FLIGHT-SIMULATOR",
      "ScanIndexForward": true,
      "ConsistentRead": false,
      "KeyConditionExpression": "#089c0 = :089c0",
      "FilterExpression": "#089c1 = :089c1",
      "ExpressionAttributeValues": {
        ":089c0": {
          "S": "ROUTE"
        },
        ":089c1": {
          "N": req.slice(1).toString(), //RouteId
        }
      },
      "ExpressionAttributeNames": {
        "#089c0": "PK",
        "#089c1": "RouteId"
      }
    }
  }
}
exports.getTheRouteDeparture = function(req, res){
  const queryInput = createQueryInput(req.params.routeid);
  // Call DynamoDB's query API
  executeQuery(dynamoDbClient, queryInput).then(() => {
      console.info('Query API call has been executed.')
      }
   );
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

  function createQueryInput(req) {
    return {
      "TableName": "FLIGHT-SIMULATOR",
      "ScanIndexForward": true,
      "ConsistentRead": false,
      "KeyConditionExpression": "#ed5e2 = :ed5e2",
      "ProjectionExpression": "#ed5e0,#ed5e1",
      "ExpressionAttributeValues": {
        ":ed5e2": {
          "S": "ROUTE"
        }
      },
      "ExpressionAttributeNames": {
        "#ed5e0": req.slice(1).toString(), //RouteId
        "#ed5e1": "DepartureAirport",
        "#ed5e2": "PK"
      }
    }
  }
}
exports.getTheRouteArrivalAirport = function(req, res){
  const queryInput = createQueryInput(req.params.routeid);
  // Call DynamoDB's query API
  executeQuery(dynamoDbClient, queryInput).then(() => {
      console.info('Query API call has been executed.')
      }
   );
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

  function createQueryInput(req) {
    return {
      "TableName": "FLIGHT-SIMULATOR",
      "ScanIndexForward": true,
      "ConsistentRead": false,
      "KeyConditionExpression": "#b11b2 = :b11b2",
      "ProjectionExpression": "#b11b0,#b11b1",
      "ExpressionAttributeValues": {
        ":b11b2": {
          "S": "ROUTE"
        }
      },
      "ExpressionAttributeNames": {
        "#b11b0": req.slice(1).toString(), //RouteId
        "#b11b1": "ArrivalAirport",
        "#b11b2": "PK"
      }
    }
  }
}
exports.getTheRouteFlightTime = function(req, res){
  const queryInput = createQueryInput(req.params.routeid);
  // Call DynamoDB's query API
  executeQuery(dynamoDbClient, queryInput).then(() => {
      console.info('Query API call has been executed.')
      }
   );
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

  function createQueryInput(req) {
    return {
      "TableName": "FLIGHT-SIMULATOR",
      "ScanIndexForward": true,
      "ConsistentRead": false,
      "KeyConditionExpression": "#c0d12 = :c0d12",
      "ProjectionExpression": "#c0d10,#c0d11",
      "ExpressionAttributeValues": {
        ":c0d12": {
          "S": "ROUTE"
        }
      },
      "ExpressionAttributeNames": {
        "#c0d10": req.slice(1).toString(), //RouteId
        "#c0d11": "TimeOfFlight",
        "#c0d12": "PK"
      }
    }
  }
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

// Handles errors during Query execution. Use recommendations in error messages below to 
// add error handling specific to your application use-case. 
function handleQueryError(err) {
    if (!err) {
      console.error('Encountered error object was empty');
      return;
    }
    if (!err.code) {
      console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
      return;
    }
    // here are no API specific errors to handle for Query, common DynamoDB API errors are handled below
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