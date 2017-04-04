let globalPosition;
let lat = 51.1415562;
let long = 4.4431044;
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    globalPosition = lat + "," + long;
    console.log(globalPosition);
}

// Default map
function initMap(){
    let map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: parseFloat(lat), lng: parseFloat(long)},
        zoom: 16
    });
}

// Current map
function getCurrent(){
    let map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: parseFloat(lat), lng: parseFloat(long)},
        zoom: 16
    });
}






