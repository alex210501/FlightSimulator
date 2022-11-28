class PrimaryKeyQueryRequest {

    constructor(primarykey, sortkey) {

        this.primarykey = primarykey;
        this.sortkey = sortkey

    }

    // Call this function when you need all the attributes of a primary key, sortkey couple

    createQueryInput() {
        return {
          "TableName": "FLIGHT-SIMULATOR",
          "ScanIndexForward": true,
          "ConsistentRead": false,
          "KeyConditionExpression": "#cd420 = :cd420 And #cd421 = :cd421",
          "ExpressionAttributeValues": {
            ":cd420": {
              "S": this.primarykey
            },
            ":cd421": {
              "S": this.sortkey
            }
          },
          "ExpressionAttributeNames": {
            "#cd420": "PK",
            "#cd421": "SK"
          }
        }
      }
}

module.exports = PrimaryKeyQueryRequest;