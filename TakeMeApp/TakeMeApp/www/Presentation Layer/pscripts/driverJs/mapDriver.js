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

    $("#MenuOpen").click(function () {

        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css({ "width": "60%","z-index":"1012"});        
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
        $("#divMenu").css("width", "0px");

    });

    $("#StartBreak").click(function () {
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var date = d.getFullYear() + '/' +
            (month < 10 ? '0' : '') + month + '/' +
            (day < 10 ? '0' : '') + day;

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
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var date = d.getFullYear() + '/' +
            (month < 10 ? '0' : '') + month + '/' +
            (day < 10 ? '0' : '') + day;

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