// All the imports

const PrimaryKeyQueryRequest = require('./primarykeyqueryrequest.js');
const TimeDepartureQueryRequest = require('./timedeparturequeryrequest.js');
const AWS = require('aws-sdk');
const { json } = require('body-parser');


// Create the DynamoDB Client with the region you want

const dynamoDbClient = createDynamoDbClient();
function createDynamoDbClient() {
    // Use the following config instead when using DynamoDB Local
    AWS.config.update({region: 'local', endpoint: 'http://localhost:8000',  credentials: {
    accessKeyId: 'user',
    secretAccessKey: 'password'
  }});
    console.log(AWS.config);
    return new AWS.DynamoDB();
}



/*
    ***********************************************************************************************
    *                                                                                             *
    * Request for the flight that contains also the route, the departure and the arrival airports *
    *                                                                                             *
    ***********************************************************************************************
*/


exports.getTheFlight = async function(req, res){
  
  let jsonResult = {};
  let flightrequest = new PrimaryKeyQueryRequest("FLIGHT", req.params.flightnumber.slice(1).toString());
  const queryInput = flightrequest.createQueryInput();

  try {
    const queryOutput = dynamoDbClient.query(queryInput).promise().then(async (flight) => {

      let routerequest = new PrimaryKeyQueryRequest("ROUTE", flight.Items[0].Route.S);
      const queryrouteInput = routerequest.createQueryInput();
      const queryrouteOutput = await dynamoDbClient.query(queryrouteInput).promise();
      jsonResult = flight.Items[0];

      jsonResult.Route = {
        J: queryrouteOutput.Items[0]
      };

      let depairportrequest = new PrimaryKeyQueryRequest("AIRPORT", queryrouteOutput.Items[0].DepartureAirport.S);
      const querydepInput = depairportrequest.createQueryInput();
      const querydepOutput = await dynamoDbClient.query(querydepInput).promise();

      jsonResult.Route.J.DepartureAirport = {
        J: querydepOutput.Items[0]
      };

      
      let arvairportrequest = new PrimaryKeyQueryRequest("AIRPORT", queryrouteOutput.Items[0].ArrivalAirport.S);
      const queryarvInput = arvairportrequest.createQueryInput();
      const queryarvOutput = await dynamoDbClient.query(queryarvInput).promise();

      jsonResult.Route.J.ArrivalAirport = {
        J: queryarvOutput.Items[0]
      };
      
     
      res.json(jsonResult);
      
    }).catch((err) => console.log(err));

  } catch (err) {
    handleQueryError(err);
  }
}


/*
    ***********************************************************************************************
    *                                                                                             *
    *         Request for the plane that also contains the plane-type and the company             *
    *                                                                                             *
    ***********************************************************************************************
*/

exports.getThePlane = async function(req, res){
  
  let jsonResult = {};
  let planerequest = new PrimaryKeyQueryRequest("PLANE", req.params.planenumber.slice(1).toString());
  const queryInput = planerequest.createQueryInput();

  try {
  
    const queryOutput = dynamoDbClient.query(queryInput).promise().then(async (plane) => {

      let companyrequest = new PrimaryKeyQueryRequest("COMPANY", plane.Items[0].Company.S);
      const querycompanyInput = companyrequest.createQueryInput();
      const querycompanyOutput = await dynamoDbClient.query(querycompanyInput).promise();
      jsonResult = plane.Items[0];

      jsonResult.Company = {
        J: querycompanyOutput.Items[0]
      };

      let planetyperequest = new PrimaryKeyQueryRequest("PLANE-TYPE", plane.Items[0].PlaneType.S);
      const queryplanetypeInput = planetyperequest.createQueryInput();
      const queryplanetypeOutput = await dynamoDbClient.query(queryplanetypeInput).promise();

      jsonResult.PlaneType = {
        J: queryplanetypeOutput.Items[0]
      };
     
      res.json(jsonResult);
      
    });
  } catch (err) {
    handleQueryError(err);
  }
}


/*
    ***********************************************************************************************
    *                                                                                             *
    *         Request to get the flightdeparture by time departure in parameter                   *
    *                                                                                             *
    ***********************************************************************************************
*/


exports.getTheFlightDeparture = async function(req, res){
  let jsonResult = [];
  let timerequest = new TimeDepartureQueryRequest("FLIGHT", req.params.time.slice(1).toString());
  const queryInput = timerequest.createQueryInput();
  let jsonarray = {};

  try {
  
    const queryOutput = dynamoDbClient.query(queryInput).promise().then(async (flight) => {
      console.log(flight.Items);

      for (let i in flight.Items)
      {
        jsonResult.push({});

        let routerequest = new PrimaryKeyQueryRequest("ROUTE", flight.Items[i].Route.S);
        const queryrouteInput = routerequest.createQueryInput();
        const queryrouteOutput = await dynamoDbClient.query(queryrouteInput).promise();
        jsonResult[jsonResult.length - 1] = flight.Items[i];
  
        jsonResult[jsonResult.length - 1].Route = {
          J: queryrouteOutput.Items[0]
        };
  
        let depairportrequest = new PrimaryKeyQueryRequest("AIRPORT", queryrouteOutput.Items[0].DepartureAirport.S);
        const querydepInput = depairportrequest.createQueryInput();
        const querydepOutput = await dynamoDbClient.query(querydepInput).promise();
  
        jsonResult[jsonResult.length - 1].Route.J.DepartureAirport = {
          J: querydepOutput.Items[0]
        };
  
        
        let arvairportrequest = new PrimaryKeyQueryRequest("AIRPORT", queryrouteOutput.Items[0].ArrivalAirport.S);
        const queryarvInput = arvairportrequest.createQueryInput();
        const queryarvOutput = await dynamoDbClient.query(queryarvInput).promise();
  
        jsonResult[jsonResult.length - 1].Route.J.ArrivalAirport = {
          J: queryarvOutput.Items[0]
        };
      }

      // jsonarray.push(jsonResult[jsonResult.length - 1])
      console.log(jsonResult[jsonResult.length - 1])
      res.json(jsonResult);
    });

  } catch (err) {
    handleQueryError(err);
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