var workerPosition = { lat: 0, lng: 0 };
var map;
var marker;
function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: workerPosition
    });

    marker = new google.maps.Marker({
        position: workerPosition,
        map: map
    });

    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(changePosition, showError, {});
    }
}

function changePosition(position) {
    if (marker != null) {
        marker.setMap(null);
    }

    workerPosition.lat = position.coords.latitude;
    workerPosition.lng = position.coords.longitude;

    map.setCenter(workerPosition);

    marker = new google.maps.Marker({
        position: workerPosition,
        map: map
    });
}


function showError(error) {
    alert("Error" + error);

}