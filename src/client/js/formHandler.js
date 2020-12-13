// handleSubmit function handle click event and updates UI
function handleSubmit(event) {
    event.preventDefault();

    // Getting fields values
    let location = document.getElementById('location').value;
    let date = document.getElementById('date').value;
    // Checking that entered values are correct
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
            document.getElementById('city').innerHTML = res.location;
            document.getElementById('forecast_date').innerHTML = res.date;
            document.getElementById('temperature').innerHTML = res.weather.data[dateDaysDiff].temp + '&#8451;';
            document.getElementById('image').src = res.img;
        })
    }
}

export { handleSubmit }
