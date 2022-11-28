// All the imports

const PrimaryKeyQueryRequest = require('./primarykeyqueryrequest.js');
const AWS = require('aws-sdk');
const { json } = require('body-parser');


// Create the DynamoDB Client with the region you want

const dynamoDbClient = createDynamoDbClient();
function createDynamoDbClient() {
    // Use the following config instead when using DynamoDB Local
    AWS.config.update({region: 'local', endpoint: 'http://localhost:8000'});
    
    return new AWS.DynamoDB();
}


exports.getTheFlight = async function(req, res){
  
  let myprequest = new PrimaryKeyQueryRequest("FLIGHT", req.params.flightnumber, "FlightNumber");
  const queryInput = myprequest.createQueryInput();
  
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
}


exports.getTheFlightRoute = async function(req, res){

  let myprequest = new PrimaryKeyQueryRequest("FLIGHT", req.params.flightnumber, "RouteId");
  const queryInput = myprequest.createQueryInputForAttribute();

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
}


exports.getTheFlightNumber = async function(req, res){
    
    let myprequest = new PrimaryKeyQueryRequest("FLIGHT", req.params.flightnumber, "FlightNumber");
    const queryInput = myprequest.createQueryInputForAttribute();

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
}


exports.getTheFlightDeparture = async function(req, res){
  
    let myprequest = new PrimaryKeyQueryRequest("FLIGHT", req.params.flightnumber, "DepartureTime");
    const queryInput = myprequest.createQueryInputForAttribute();

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
}


exports.getTheFlightPlane = function(req, res){
  const queryInput = createQueryInput(req.params.flightnumber);
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
        "#ffe81": "PlaneNumber",
        "#ffe82": "PK"
      }
    }
  }
}


exports.getTheFlightPlaneTerminal = function(req, res){
  const queryInput = createQueryInput(req.params.flightnumber);
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
        "#ffe81": "Terminal",
        "#ffe82": "PK"
      }
    }
  }
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
  const queryInput = createQueryInput(req.params.planenumber);
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
      "KeyConditionExpression": "#e14e0 = :e14e0",
      "FilterExpression": "#e14e1 = :e14e1",
      "ExpressionAttributeValues": {
        ":e14e0": {
          "S": "PLANE"
        },
        ":e14e1": {
          "S": req.slice(1).toString()
        }
      },
      "ExpressionAttributeNames": {
        "#e14e0": "PK",
        "#e14e1": "PlaneNumber"
      }
    }
  }
}


exports.getThePlaneCompany = function(req, res){
    const queryInput = createQueryInput(req.params.planenumber);
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
        "KeyConditionExpression": "#e14e0 = :e14e0",
        "ProjectionExpression": "#e14e1,#e14e2",
        "ExpressionAttributeValues": {
          ":e14e0": {
            "S": "PLANE"
          }
        },
        "ExpressionAttributeNames": {
          "#e14e0": "PK",
          "#e14e1": req.slice(1).toString(),
          "#e14e2": "CompanyName"
        }
      }
    }
}


exports.getThePlaneType = function(req, res){
  const queryInput = createQueryInput(req.params.planenumber);
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
      "KeyConditionExpression": "#e14e0 = :e14e0",
      "ProjectionExpression": "#e14e1,#e14e2",
      "ExpressionAttributeValues": {
        ":e14e0": {
          "S": "PLANE"
        }
      },
      "ExpressionAttributeNames": {
        "#e14e0": "PK",
        "#e14e1": req.slice(1).toString(),
        "#e14e2": "PlaneType"
      }
    }
  }
}


exports.getTheAirport = function(req, res){
  const queryInput = createQueryInput(req.params.airportacronym);
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
      "KeyConditionExpression": "#e14e0 = :e14e0",
      "FilterExpression": "#e14e1 = :e14e1",
      "ExpressionAttributeValues": {
        ":e14e0": {
          "S": "AIRPORT"
        },
        ":e14e1": {
          "S": req.slice(1).toString()
        }
      },
      "ExpressionAttributeNames": {
        "#e14e0": "PK",
        "#e14e1": "AirportAcronym"
      }
    }
  }
}


exports.getTheAirportName = function(req, res){
  const queryInput = createQueryInput(req.params.airportacronym);
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
      "KeyConditionExpression": "#e14e0 = :e14e0",
      "ProjectionExpression": "#e14e1,#e14e2",
      "ExpressionAttributeValues": {
        ":e14e0": {
          "S": "AIRPORT"
        }
      },
      "ExpressionAttributeNames": {
        "#e14e0": "PK",
        "#e14e1": req.slice(1).toString(),
        "#e14e2": "AirportName"
      }
    }
  }
}


exports.getTheAirportTerminalNumber = function(req, res){
  const queryInput = createQueryInput(req.params.airportacronym);
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
      "KeyConditionExpression": "#e14e0 = :e14e0",
      "ProjectionExpression": "#e14e1,#e14e2",
      "ExpressionAttributeValues": {
        ":e14e0": {
          "S": "AIRPORT"
        }
      },
      "ExpressionAttributeNames": {
        "#e14e0": "PK",
        "#e14e1": req.slice(1).toString(),
        "#e14e2": "AirportTerminal"
      }
    }
  }
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