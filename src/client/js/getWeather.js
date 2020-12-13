const getWeather = async (incoming) => {    
    const res = await fetch('http://api.weatherbit.io/v2.0/forecast/daily' + '?lat=' + incoming['lat'] + '&lon=' + incoming['lng'] + '&key=' + process.env.weatherbit); 
    try {
        const data = await res.json();
        console.log(data);
        incoming['weather'] = data;
        return incoming;
    } catch (error) {
        console.log("error",error);
        return false;
    }
}

export { getWeather }
