import axios, {isCancel} from "../../node_modules/axios/dist/node/axios.cjs";
import type { Config, Context } from "@netlify/edge-functions";


export default async (req, context) => {
    console.log(req.body);
    let data = {};
    data['location'] = req.body.location;
    data['date'] = req.body.date;
    data['error'] = '';
    let res = new Response();
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
        res.body = data;
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
            res.body = data;
        })
        .then(function () {
            // Getting picture city picture from Pixabay API
            axios.get('https://api.unsplash.com/search/photos?query=' + data['location'].replace(/\s/g, '+') + '&client_id=y9qmhW-78MRf7O9A8AO1ShX-cbXTIdEaeDIXcjy-45k')
            .then(function (response) {
                // handle success
                console.log(response.data);
                data['img'] = response.data.results[2].urls.small;
                console.log(data);
            })
            .catch(function (error) {
            // handle error
                console.log(error);
                data['img'] = 'https://askleo.askleomedia.com/wp-content/uploads/2004/06/no_image-600x490.jpg.webp';
                data['error'] = 'Picture not found in Pixabay API';
                res.body = data;
            })
            .then(function () {
            // always executed
                res.body = data;
        });
        });
    });    
};

export const config: Config = {
  path: "/weather",
};
