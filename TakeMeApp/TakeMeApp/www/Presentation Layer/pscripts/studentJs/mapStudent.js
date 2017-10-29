var workerPosition = { lat: 32.341441920300006, lng: 34.9123955 };
var map; 
var marker;
var markers = [];

var loadDriverWP = window.setInterval(function () {
    setMapOnAll(null);
    var UserRide = {
        UserID: localStorage.userid
    };

    $.ajax({
        url: WebServiceURL + "/LoadDriverWP",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(UserRide),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
           
            var res = data.d;
            var result = JSON.parse(res);
        
            if (res !== "NULL") {

                for (var i = 0; i < result.length; i++) {
                 
                    var img = {
                        url: "../images/police-car.png",
                        scaledSize: new google.maps.Size(60, 60),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 0)
                    };

                    marker = new google.maps.Marker({
                        position: { lat: result[i].Currentlat    * 1, lng: result[i].CurrentLong * 1 },
                        map: map,
                        icon: img,
                        animation: google.maps.Animation.DROP
                    });
                    markers.push(marker);
                }
            }
            else {
                alert("ההזמנה בטיפול");
            }
        }
    });

}, 5000);

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

$(document).ready(function () {

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

    $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.replace("../pageLogin/LoginPage.html");
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

    var img = {
        url: "../images/marker-green.png",
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    var marker = new google.maps.Marker({
        position: workerPosition,
        map: map,
        icon: img,
        animation: google.maps.Animation.DROP
    });


}
