const getCoordinates = async (incoming) => {    
    const res = await fetch('http://api.geonames.org/searchJSON?' +'&q='+incoming['location']+'&username=andreiliphd'); 
    try {
        const data = await res.json();
        console.log(data);
        incoming['lat'] = data.geonames[0].lat;
        incoming['lng'] = data.geonames[0].lng;
        return incoming
    } catch (error) {
        console.log("error",error);
        return false;
    }
}

export { getCoordinates }