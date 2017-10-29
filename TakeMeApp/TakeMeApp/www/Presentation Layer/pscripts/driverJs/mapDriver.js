var workerPosition = { lat: 32.341441920300006, lng: 34.9123955 };
var map;
var marker;
var markers = [];
var Img;
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var date = month + '/' + (day < 10 ? '0' : '') + day + '/' + d.getFullYear();
var loadloadOrdersCall = window.setInterval(function () {
    loadOrders();
}, 40000);
var coordsLat = 1;
var coordsLng = 1;

var UpdateWayPointDriver = {

    userID: localStorage.userid,
    lat: coordsLat,
    longi: coordsLng
};

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: workerPosition,
        mapTypeControl: false,
        zoomControl: false,
        disableDefaultUI: true
    });

    var img = {
        url: "../images/police-car.png",
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    marker = new google.maps.Marker({
        position: workerPosition,
        map: map,
        icon: img,
        animation: google.maps.Animation.DROP
    });

    //if (navigator.geolocation) {
    //    watchId = navigator.geolocation.watchPosition(changePosition, showError, {});
    //}
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
            alert("נא לאשר את השימוש בשירות המיקום.");
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

$(document).ready(function () {

    loadOrders();

    $("#MenuOpen").click(function () {
      
        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css({ "width": "60%", "z-index": "1012" });
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
        $("#divMenu").css("width", "0px");

    });

    $("#StartBreak").click(function () {

        UserSB =
            {
                userID: localStorage.userid,
                date: date
            };

        $.ajax({
            url: WebServiceURL + "/StartBreak",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(UserSB),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
               
            }

        });
    });

    $("#EndtBreak").click(function () {

        UserEB =
            {
                userID: localStorage.userid,
                date: date
            };

        $.ajax({
            url: WebServiceURL + "/EndtBreak",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(UserEB),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
               
            }

        });
    });

    $("#BtnReport").click(function () {
        window.location.replace("ReportDriver.html");
    });

    $("#BtnRequests").click(function () {
        window.location.replace("Requests.html");
    });

    $("#EndtWorking").click(function () {

        var dt = new Date();
        var time = (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();

        UserEW =
            {
                date: date,
                time: time,
                userID: localStorage.userid
            };

        $.ajax({
            url: WebServiceURL + "/EndtWorking",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(UserEW),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
            
            }

        });
    });

    $(".EndRide").click(function () {

        var driverID = { driverID: localStorage.userid };

        $.ajax({
            url: WebServiceURL + "/FinishRide",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(driverID),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                $(".EndRide").addClass('hideER');
              
            }
        });

    });
  
    $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.replace("../pageLogin/LoginPage.html");
    });

});

function loadOrders() {
    setMapOnAll(null);

    var todaydate = { todaydate: date };

    $.ajax({
        url: WebServiceURL + "/LoadImmediateOrders",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var result = JSON.parse(data.d);
            Img = "../images/marker-green.png";
            showOrdersOnMap(result, Img);
        }
    });

    $.ajax({
        url: WebServiceURL + "/LoadPreOrders",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(todaydate),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var result = JSON.parse(data.d);
            Img = "../images/marker-blue.png";
            showOrdersOnMap(result, Img);
        }
    });

}

function showOrdersOnMap(resOutput, Img) {

    var img = {
        url: Img,
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };
    var marker;

    for (var i = 0; i < resOutput.length; i++) {

        marker = new google.maps.Marker({
            position: { lat: resOutput[i].lat * 1, lng: resOutput[i].long * 1 },
            map: map,
            icon: img,
            animation: google.maps.Animation.DROP
        });
        markers.push(marker);
        addMarkerListner(marker, resOutput[i]);
    }

}

function addMarkerListner(marker, details) {
    marker.addListener('click', function () {
        showOrderDetails(marker, details);
    });
}

function showOrderDetails(marker, details) {
   
    $("#orderUserName").html(details.UserFName);
    $("#orderDateTime").html(details.RequestDate);
    $("#orderInfo").fadeIn(2000);
    $("#TakeMe").click(function () {
        removeRequestFromDb(marker, details);
        $("#orderInfo").fadeOut(1000);
    });
    $("#backInfo").click(function () {
        $("#orderInfo").fadeOut(1000);
    });
}

function removeRequestFromDb(marker,details) {

    var removeRequestUser =
        {
            datetime: details.RequestDate,
            userID: details.UserID,
            driverID:localStorage.userid
        };

    $.ajax({
        url: WebServiceURL + "/ChangeReqStatus",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(removeRequestUser),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            marker.setMap(null);
            updateLatLongDriverInDB();
            $(".EndRide").addClass('showER');
        }
    });

}

function updateLatLongDriverInDB() {
    window.setInterval(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (pos) {
                UpdateWayPointDriver.longi = pos.coords.longitude;
                UpdateWayPointDriver.lat = pos.coords.latitude;

                $.ajax({
                    url: WebServiceURL + "/UpdateWayPoint",
                    dataType: "json",
                    type: "POST",
                    data: JSON.stringify(UpdateWayPointDriver),
                    contentType: "application/json; charset=utf-8",
                    error: function (jqXHR, exception) {
                        alert(formatErrorMessage(jqXHR, exception));
                    },
                    success: function (data) {
                    }
                });
            },

            function (error) {
                alert("Error");
            },

            {}
        );
        }
    }, 2000);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}//Delete all markers + events
