function getWeather(currentLocation) {
    console.log(currentLocation);
    let url = "https://api.darksky.net/forecast/39ffde42aca436437dfa18ea68f030d8/" + currentLocation;

    $.ajax({
        url: url,
        method: 'GET',
        cache: false,
        dataType: 'jsonp',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(response){
            console.log(response.currently);
            let summary = response.currently.summary;
            let temp = convertToC(response.currently.temperature);

            function convertToC(tempFar) {
                let fTempVal = parseFloat(tempFar);
                let cTempVal = (fTempVal - 32) * (5/9);
                console.log(cTempVal);
                return Math.round(cTempVal);
            }

            reply = "It is " + summary + " and the temperature is " + temp + " degrees";
            _speak()
        }
    });
}