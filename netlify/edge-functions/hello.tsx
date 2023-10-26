export default async (request, context) => {
    let req = await request.json();
    let data = {};
    data['location'] = req.location;
    data['date'] = req.date;
    data['error'] = '';
    console.log(req);
    let answer = {};
    
    // Example POST method implementation:
    async function getData(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
    }
   
    // Getting lat and lon from Geoname API
    let lnglat = await getData('http://api.geonames.org/searchJSON?q=' + req.location + '&maxRows=1&username=andreiliphd');
    console.log(lnglat);
    data['lng'] = lnglat.geonames[0].lng;
    data['lat'] = lnglat.geonames[0].lat;
    let wbit = await getData('http://api.weatherbit.io/v2.0/forecast/daily?'+ '&lat=' + data['lat'] + '&lon=' + data['lng'] + '&key=' + "d4c9f9c4f54842ac8faa3085cfbb3e1e")
    console.log(wbit);
    data['weather'] = wbit.data;
    let splg = await getData('https://api.unsplash.com/search/photos?query=' + data['location'] + '&client_id=y9qmhW-78MRf7O9A8AO1ShX-cbXTIdEaeDIXcjy-45k')
    console.log(splg);
    data['img'] = splg.results[2].urls.small; 
    console.log(data);
    console.log("fin");    
    return new Response(JSON.stringify(data), {"status": 200});    
};

export const config = {
  path: "/weather",
};
