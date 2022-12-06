//Import express
let express = require('express');
const cors = require('cors');

//Initialize the app
let app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));

let router = require('./Route');
app.use('/', router);

//Port Used for Express
port = 8023

//Initialize connection
app.listen(port, function(){
    console.log('running on port : '+port)
});


//Initialize DynamoDB
//java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8081
//aws dynamodb list-tables --endpoint-url http://localhost:X
//With X number of the port ex:8081