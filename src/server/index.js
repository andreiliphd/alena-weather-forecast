var path = require('path');
const express = require('express');
var webpack = require('webpack');
var webpackConfig = require('../../webpack.dev');
var compiler = webpack(webpackConfig);
const https = require('https');
const querystring = require('querystring');
const axios = require('axios');
require("dotenv").config();

const app = express();

app.use(express.static("dist"));

console.log(path.resolve(__dirname, '../../dist'));

app.use(express.json());
app.use(require("webpack-dev-middleware")(compiler, {
    outputFileSystem: path.resolve(__dirname, '../../dist'),
    writeToDisk: path.resolve(__dirname, '../../dist')
}));

var options = {
    host: 'api.meaningcloud.com',
    path: '/sentiment-2.1',
    port: 443,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    } 
  };  

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// designates what port the app will listen to for incoming requests
function logServer() {
    console.log('Weather Forecast App is listening on port 8081!');
}

app.listen(8081, logServer);


app.post('/sentiment', function (req, res) {
    console.log(req.body);
    let data = {};
    data['location'] = req.body.location;
    data['date'] = req.body.date;
    data['error'] = '';
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
    // always executed
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
            // always executed
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
                data['error'] = 'Error has happened during making request to external API';
                res.send(data);
            })
            .then(function () {
            // always executed
                res.send(data);
        });


        });

    });
    console.log('http://api.weatherbit.io/v2.0/forecast/daily?'+ '&lat=' + data['lat'] + '&lon=' + data['lng'] + '&key=' + process.env.weatherbit);
    
});