const getWeather = async (incoming) => {  
    console.log('Data from server ');
    console.log(incoming);
    try {
        const res = await fetch('https://api.weatherbit.io/v2.0/forecast/daily' + '?lat=' + incoming['lat'] + '&lon=' + incoming['lng'] + '&key=' + process.env.weatherbit); 
    } catch (error) {
        console.log(error);
    }
    try {
        const data = await res.json();
        console.log(data);
        incoming['weather'] = data;
        return incoming;
    } catch (error) {
        console.log("error",error);
        return incoming;
    }
}

export { getWeather }
