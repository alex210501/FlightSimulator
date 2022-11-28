class PrimaryKeyQueryRequest {

    constructor(primarykey, attribute, attributename) {

        this.primarykey = primarykey;
        this.attribute = attribute;
        this.attributename = attributename;

    }

    // Call this function when you need all the attributes of a primery key
    createQueryInput() {
        return {

          "TableName": "FLIGHT-SIMULATOR",
          "ScanIndexForward": true,
          "ConsistentRead": false,
          "KeyConditionExpression": "#e14e0 = :e14e0",
          "FilterExpression": "#e14e1 = :e14e1",
          "ExpressionAttributeValues": {
            ":e14e0": {
              "S": this.primarykey
            },
            ":e14e1": {
              "S": this.attribute.slice(1).toString()
            }
          },
          "ExpressionAttributeNames": {
            "#e14e0": "PK",
            "#e14e1": this.attributename
          }
        }
      }

      
    // Call this function when you need a single attribute of a primery key
    createQueryInputForAttribute() {
      return {
        "TableName": "FLIGHT-SIMULATOR",
        "ScanIndexForward": true,
        "ConsistentRead": false,
        "KeyConditionExpression": "#c4882 = :c4882",
        "ProjectionExpression": "#c4880,#c4881",
        "ExpressionAttributeValues": {
          ":c4882": {
            "S": this.primarykey
          }
        },
        "ExpressionAttributeNames": {
          "#c4880": this.attribute.slice(1).toString(),
          "#c4881": this.attributename,
          "#c4882": "PK"
        }
      }
    }
    

}

module.exports = PrimaryKeyQueryRequest;