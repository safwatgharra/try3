var workerPosition = { lat: 43.47836101344629, lng: -80.53074049212657 };
var map;
var marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: workerPosition,
        mapTypeControl: false,
        zoomControl: false,
        disableDefaultUI: true
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
    if (marker !== null) {
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

$(document).ready(function () {

    $("#MenuOpen").click(function () {

        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css({ "width": "60%","z-index":"1012"});        
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
        $("#divMenu").css("width", "0px");

    });

    $("#BtnReport").click(function () {
        window.location.replace("ReportDriver.html");
    });
    
});