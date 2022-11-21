//Import express
let express = require('express');

//Initialize the app
let app = express();

app.use(express.urlencoded({extended:true}));

let router = require('./Route');
app.use('/', router);

app.listen(8023, function(){
    console.log('running on port 8081')
});

