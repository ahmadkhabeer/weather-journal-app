// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 9999;
app.listen(port,() => {
    console.log(`The server is running on port: ${port}`)
});

// get data
app.get('/getData',function(req,res){
    res.send(projectData);
});

// post data
app.post('/sendData',function(req,res){
    projectData = req.body;
    res.send(projectData);
});