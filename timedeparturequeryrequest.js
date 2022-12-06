class TimeDepartureQueryRequest {

    constructor(primarykey, min) {
        this.primarykey = primarykey;
        this.min = min;
        this.max = min+3599;
    }

    // Call this function when you need all the attributes of a primary key, sortkey couple

    createQueryInput() {
      return {
        "TableName": "FLIGHT-SIMULATOR",
        "ScanIndexForward": false,
        "ConsistentRead": false,
        "KeyConditionExpression": "#a99a6 = :a99a6",
        "FilterExpression": "#a99a7 BETWEEN :a99a7 AND :a99a8",
        "ProjectionExpression": "#a99a0,#a99a1,#a99a2,#a99a3,#a99a4,#a99a5",
        "ExpressionAttributeValues": {
          ":a99a6": {
            "S": this.primarykey
          },
          ":a99a7": {
            "N": this.min
          },
          ":a99a8": {
            "N": this.max
          }
        },
        "ExpressionAttributeNames": {
          "#a99a0": "PKSK",
          "#a99a1": "SK",
          "#a99a2": "DepartureTime",
          "#a99a3": "Plane",
          "#a99a4": "Terminal",
          "#a99a5": "Route",
          "#a99a6": "PK",
          "#a99a7": "DepartureTime"
        }
      }
      }
}

module.exports = TimeDepartureQueryRequest;