// handleSubmit function handle click event and updates UI
function handleSubmit(event) {
    event.preventDefault();

    // Getting fields values
    let location = document.getElementById('location').value;
    let date = document.getElementById('date').value;
    if (!location || !date) {
        document.getElementById('status').innerHTML = 'Please, fill both fields.';
        return false;
    } else {
        document.getElementById('status').innerHTML = '';
    }

    // Checking that entered values are correct
    if (document.getElementById('javascript').checked) {
        if (Client.checkForName(location)) {
            let data = {};
            data['location'] = location;    
            data['date'] = date;    
            console.log("::: Form Submitted :::");
            // Getting data from API
            Client.getCoordinates(data).then(Client.getWeather).then(Client.getImage).then(function(res) {
                console.log(res);
                // Parsing date
                let startDate = Date.parse(document.getElementById('date').value);
                // Calculating date
                let date = startDate - Date.now();            
                let dateDaysDiff = Math.ceil(date / (1000 * 60 * 60 * 24));
                // Updating UI
                try {
                    if (res.location) document.getElementById('city').innerHTML = res.location;
                } catch (error) {
                    console.log(error);
                }
                try {
                    if (res.date) document.getElementById('forecast_date').innerHTML = res.date;
                } catch (error) {
                    console.log(error);
                }
                try {
                    if (res.temp) document.getElementById('temperature').innerHTML = res.weather.data[dateDaysDiff].temp + "<sup>o</sup>C";
                } catch (error) {
                    console.log(error);
                }
                try {
                    if (res.img) document.getElementById('image').src = res.img;
                } catch (error) {
                    console.log(error);
                }
                Client.saveToServer(res);
        });
        }
    }
     else {
        if (Client.checkForName(location)) {
            let data = {};
            data['location'] = location;    
            data['date'] = date;    
            console.log("::: Form Submitted :::");
            // Getting data from API
            Client.getAPI(data)
            .then(function(res) {
                console.log(res);

                // Parsing date
                let startDate = Date.parse(document.getElementById('date').value);

                // Calculating date
                let date = startDate - Date.now();            
                let dateDaysDiff = Math.ceil(date / (1000 * 60 * 60 * 24));

                // Updating UI
                try {
                    document.getElementById('city').innerHTML = res.location;
                } catch (error) {
                    console.log(error);
                }
                try {
                    document.getElementById('forecast_date').innerHTML = res.date;
                } catch (error) {
                    console.log(error);
                }
                try {
                    document.getElementById('temperature').innerHTML = res.weather.data[dateDaysDiff].temp + "<sup>o</sup>C";
                } catch (error) {
                    console.log(error);
                }
                try {
                    document.getElementById('image').src = res.img;
                } catch (error) {
                    console.log(error);
                }
        })        
    }    
}
}

export { handleSubmit }
