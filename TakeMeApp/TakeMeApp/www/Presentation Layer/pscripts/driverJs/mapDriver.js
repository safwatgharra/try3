var workerPosition = { lat: 43.47836101344629, lng: -80.53074049212657 };
var map;
var marker;
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var date = month + '/' + (day < 10 ? '0' : '') + day + '/' + d.getFullYear();

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

$(document).ready(function () {

    //loadOrders();

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
                alert("res-" + res);
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
                alert("res-" + res);
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
                alert("res-" + res);
            }

        });
    });

    $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.replace("../pageLogin/LoginPage.html");
    });

});

function loadOrders() {

    UserOR =
        {
        todaydate: date
        };

    //$.ajax({
    //    url: WebServiceURL + "/LoadImmediateOrders",
    //    dataType: "json",
    //    type: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    error: function (jqXHR, exception) {
    //        alert(formatErrorMessage(jqXHR, exception));
    //    },
    //    success: function (data) {
    //        var res = data.d;
    //        alert("res-הצלחת טעינה" + res);
    //    }

    //});

    //$.ajax({
    //    url: WebServiceURL + "/LoadPreOrders",
    //    dataType: "json",
    //    type: "POST",
    //    data: JSON.stringify(UserOR),
    //    contentType: "application/json; charset=utf-8",
    //    error: function (jqXHR, exception) {
    //        alert(formatErrorMessage(jqXHR, exception));
    //    },
    //    success: function (data) {
    //        var res = data.d;
    //        alert("res-" + res);
    //    }

    //});
    

}

function showOrdersOnMap(Orders) {
    var img = {
        url: "../images/marker-green.png", // url
        scaledSize: new google.maps.Size(60, 60), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0)
    };

    //navigator.geolocation.clearWatch(watchId);
    for (var i = 0; i < Orders.length; i++) {
        //var imgSTR = Orders[i].Hazard_Image;
        //imgSTR = imgSTR.substring(23);
        alert(Orders[i]);
        var marker = new google.maps.Marker({
            position: { lat: Orders[i].lat, lng: Orders[i].long },
            map: map,
            icon: img,
            animation: google.maps.Animation.DROP
        });

    }
}