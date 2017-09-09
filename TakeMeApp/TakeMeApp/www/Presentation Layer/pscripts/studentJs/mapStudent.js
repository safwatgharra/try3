var workerPosition = { lat: 43.47836101344629, lng: -80.53074049212657 };
var map;
var marker;

$(document).ready(function () {
    //loadOrders();

    $("#MenuOpen").click(function () {

        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css({ "width": "60%", "z-index": "1012" });
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
        $("#divMenu").css("width", "0%");

    });

    $("#myOrders").click(function () {

        window.location.replace("OrdersPage.html");
    });

});

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
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("נא לשאר את השימוש בשירות המיקום.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
        default:
            alert("An unknown error occurred.(default)");
            break;
    }

}

function loadOrders() {
    $.ajax({
        url: "",
        dataType: "json",
        type: "POST",
        data: {},
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var res = data.d;
            var resOutput = JSON.parse(res);
            alert("res-" + res);

            if (resOutput != null) {
                alert("succesfuly loading orders");
                //showOrdersOnMap(result);
            }
            else {
                alert("Failed Loading Orders");
            }
        }
    });
}

function showOrdersOnMap(hazards) {
    var img = {
        url: "images/hazardPointer.png", // url
        scaledSize: new google.maps.Size(60, 60), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
    };
    //navigator.geolocation.clearWatch(watchId);
    for (var i = 0; i < hazards.length; i++) {
        var imgSTR = hazards[i].Hazard_Image;
        //imgSTR = imgSTR.substring(23);

        var marker = new google.maps.Marker({
            position: { lat: hazards[i].Hazard_Lat, lng: hazards[i].Hazard_Long },
            map: map,
            icon: img,
            animation: google.maps.Animation.DROP
        });

        showHazardDetails(marker, hazards[i]);
    }
}


