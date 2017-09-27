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

    loadOrders();
    $("#asd").click(function () {
        loadOrders();
    });
    $("#MenuOpen").click(function () {

        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css({ "width": "60%", "z-index": "1012" });
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
        $("#divMenu").css("width", "0px");

    });

    $("#StartBreak").click(function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var Date = month + "/" + day + "/" + d.getFullYear();


        UserSB =
            {
                userID: localStorage.userid,
                date: date
            };

        //$.ajax({
        //    url: WebServiceURL + "/StartBreak",
        //    dataType: "json",
        //    type: "POST",
        //    data: JSON.stringify(UserSB),
        //    contentType: "application/json; charset=utf-8",
        //    error: function (jqXHR, exception) {
        //        alert(formatErrorMessage(jqXHR, exception));
        //    },
        //    success: function (data) {
        //        var res = data.d;
        //        var resOutput = JSON.parse(res);
        //        alert("res-" + res);

        //        //if (resOutput != null) {

        //        //}
        //        //else {
        //        //    alert("User Not Found!");
        //        //}
        //    }

        //});
    });

    $("#EndtBreak").click(function () {
        var dt = new Date();
        var Time = (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var date = month + "/" + day + "/" + d.getFullYear();
        var DateTime = date + " " + Time;


        UserEB =
            {
                userID: localStorage.userid,
                date: date
            };

        //$.ajax({
        //    url: WebServiceURL + "/EndtBreak",
        //    dataType: "json",
        //    type: "POST",
        //    data: JSON.stringify(UserSB),
        //    contentType: "application/json; charset=utf-8",
        //    error: function (jqXHR, exception) {
        //        alert(formatErrorMessage(jqXHR, exception));
        //    },
        //    success: function (data) {
        //        var res = data.d;
        //        var resOutput = JSON.parse(res);
        //        alert("res-" + res);

        //        //if (resOutput != null) {

        //        //}
        //        //else {
        //        //    alert("User Not Found!");
        //        //}
        //    }

        //});
    });

    $("#BtnReport").click(function () {
        window.location.replace("ReportDriver.html");
    });

    $("#BtnRequests").click(function () {
        window.location.replace("Requests.html");
    });

    $("#EndtWorking").click(function () {
        //EndtWorking
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var date = d.getFullYear() + '/' +
            (month < 10 ? '0' : '') + month + '/' +
            (day < 10 ? '0' : '') + day;

        var dt = new Date();
        var time = (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
        UserEW =
            {
                date: date,
                time: time
                , userID: localStorage.userid
            };

        //$.ajax({
        //    url: WebServiceURL + "/EndtWorking",
        //    dataType: "json",
        //    type: "POST",
        //    data: JSON.stringify(UserEW),
        //    contentType: "application/json; charset=utf-8",
        //    error: function (jqXHR, exception) {
        //        alert(formatErrorMessage(jqXHR, exception));
        //    },
        //    success: function (data) {
        //        var res = data.d;
        //        var resOutput = JSON.parse(res);
        //        alert("res-" + res);

        //        //if (resOutput != null) {

        //        //}
        //        //else {
        //        //    alert("User Not Found!");
        //        //}
        //    }

        //});

    });

    $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.replace("../pageLogin/LoginPage.html");
    });

});

function loadOrders() {
    $.ajax({

        // The 'type' property sets the HTTP method.
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',

        // The URL to make the request to.
        url: WebServiceURL + "/LoadImmediateOrders",

        // The 'contentType' property sets the 'Content-Type' header.
        // The JQuery default for this property is
        // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
        // a preflight. If you set this value to anything other than
        // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
        // you will trigger a preflight request.
        contentType: 'text/plain',

        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: false
        },

        headers: {
            // Set any custom headers here.
            // If you set any non-simple headers, your server must include these
            // headers in the 'Access-Control-Allow-Headers' response header.
        },

        success: function (data) {
            // Here's where you handle a successful response.
            var res = data.d;
            var result = JSON.parse(res);
            alert(res);
            showOrdersOnMap(res);
        },

        error: function (jqXHR, exception) {
            // Here's where you handle an error response.
            // Note that if the error was due to a CORS issue,
            // this function will still fire, but there won't be any additional
            // information about the error.
            alert(formatErrorMessage(jqXHR, exception) + "!!!");
        }
    });
    //$.ajax({
    //    url: ,
    //    //dataType: "json",
    //    type: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    success: function (data) {
    //        var res = data.d;
    //        var result = JSON.parse(res);
    //        alert(res);
    //        showOrdersOnMap(res);
    //    },
    //    error: function (jqXHR, exception) {
    //        alert(formatErrorMessage(jqXHR, exception) + "!!!");
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