function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let location = document.getElementById('location').value;
    let date = document.getElementById('date').value;
    if (Client.checkForName(location)) {
        let data = {};
        data['location'] = location;    
        data['date'] = date;    
        console.log("::: Form Submitted :::");
        Client.getAPI(data)
        .then(function(res) {
            console.log(res);
            let startDate = Date.parse(document.getElementById('date').value);
            let date = startDate - Date.now();

            let dateDaysDiff = Math.ceil(date / (1000 * 60 * 60 * 24));
            document.getElementById('city').innerHTML = res.location;
            document.getElementById('forecast_date').innerHTML = res.date;
            document.getElementById('temperature').innerHTML = res.weather.data[dateDaysDiff].temp + '&#8451;';
            document.getElementById('image').src = res.img;
        })
    }
}

export { handleSubmit }
