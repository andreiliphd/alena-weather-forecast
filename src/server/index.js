// Importing required dependencies
var path = require('path');
const express = require('express');
var webpack = require('webpack');
var webpackConfig = require('../../webpack.dev');
var compiler = webpack(webpackConfig);
const https = require('https');
const querystring = require('querystring');
const axios = require('axios');
require("dotenv").config();

// Making an express app using imported function
const app = express();

// Define location of static assets
app.use(express.static("dist"));

// Add json functionality to express
app.use(express.json());

// Add dynamic recompile
app.use(require("webpack-dev-middleware")(compiler, {
    outputFileSystem: path.resolve(__dirname, '../../dist'),
    writeToDisk: path.resolve(__dirname, '../../dist')
}));

// Setting up routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// Logging server information
function logServer() {
    console.log('Weather Forecast App is listening on port 8081!');
}

// Starting listening for a port
app.listen(8081, logServer);

let projectData = {};
app.post('/add', function (req, res) {
    projectData = req.body;
    console.log('Added Project Data to Server ', projectData);
});

app.get('/all', function (req, res) {
    res.send(projectData);
    console.log(projectData) 
});



// Setting up POST route
app.post('/weather', function (req, res) {
    console.log(req.body);
    let data = {};
    data['location'] = req.body.location;
    data['date'] = req.body.date;
    data['error'] = '';
    // Getting lat and lon from Geoname API
    axios.get('http://api.geonames.org/searchJSON?q=' + req.body.location + '&maxRows=1&username=andreiliphd')
        .then(function (response) {
            
        // handle success
        console.log(response.data);
        data['lng'] = response.data.geonames[0].lng;
        data['lat'] = response.data.geonames[0].lat;
        ;
        console.log(data);
    })
    .catch(function (error) {
    // handle error
        console.log(error);
        data['error'] = 'Error has happened during making request to external API';
        res.send(data);
    })
    .then(function () {
        // Getting information about weather from Weatherbit API using lat and lon
        axios.get('http://api.weatherbit.io/v2.0/forecast/daily?'+ '&lat=' + data['lat'] + '&lon=' + data['lng'] + '&key=' + process.env.weatherbit)
        .then(function (response) {
            
            // handle success
            data['weather'] = response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            data['error'] = 'Error has happened during making request to external API';
            res.send(data);
        })
        .then(function () {
            // Getting picture city picture from Pixabay API
            axios.get('https://pixabay.com/api/videos/?key=' + process.env.pixabay +'&q=' + data['location'].replace(/\s/g, '+') + '&category=places')
            .then(function (response) {
                // handle success
                console.log(response.data);
                data['img'] = response.data.hits[0].userImageURL;
                console.log(data);
            })
            .catch(function (error) {
            // handle error
                console.log(error);
                data['img'] = 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-600x490.jpg.webp';
                data['error'] = 'Picture not found in Pixabay API';
                res.send(data);
            })
            .then(function () {
            // always executed
                res.send(data);
        });
        });
    });    
});