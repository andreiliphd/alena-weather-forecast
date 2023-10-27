const getCoordinates = async (incoming) => {   
    console.log('getCoordinates');
    console.log(incoming);
    try {
        const res = await fetch('http://api.geonames.org/searchJSON?' +'&q='+incoming['location']+'&username=andreiliphd'); 
    } catch (error) {
        console.log(error);
    }

    try {
        const data = await res.json();
        console.log(data);
        incoming['lat'] = data.geonames[0].lat;
        incoming['lng'] = data.geonames[0].lng;
        return incoming
    } catch (error) {
        console.log("error",error);
        return incoming;
    }
}

export { getCoordinates }