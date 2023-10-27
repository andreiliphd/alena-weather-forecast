const getWeather = async (incoming) => {  
    console.log('Data from server ');
    console.log(incoming);
    let res;
    try {
        res = await fetch('https://api.weatherbit.io/v2.0/forecast/daily' + '?lat=' + incoming['lat'] + '&lon=' + incoming['lng'] + '&key=' + 'd4c9f9c4f54842ac8faa3085cfbb3e1e'); 
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
