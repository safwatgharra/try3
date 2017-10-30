$(document).ready(function myfunction() {

    //____________________menu view______________________
    $("#MenuOpen").click(function () {
        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css("width", "50%");
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
        $("#divMenu").css("width", "0%");

    });

    $("#BtnReport").click(function () {
        window.location.replace("ReportDriver.html");
    });

    $("#divCir").click(function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var date = month + '/' + (day < 10 ? '0' : '') + day + '/' + d.getFullYear();

        var dt = new Date();
        var time = (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();

        UserSW =
            {
                date: date,
                time: time,
                userID: localStorage.userid
            };

        $.ajax({
            url: WebServiceURL + "/StartWorking",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(UserSW),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
                window.location.replace("mapDriver.html");
            }

        });


    });

    $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.replace("../pageLogin/LoginPage.html");
    });
});

function onDeviceReady() {
    var IconBadgeNumber = 0;

    var push = PushNotification.init({
        android: {
            senderID: "655974645932"
        },
        browser: {
            //pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    push.on('registration', function (data) {
       //alert(data.registrationId);

        var regId = {
            regId: data.registrationId,
            userId: localStorage.userid
        };

        $.ajax({
            url: WebServiceURL + "/InsertRegIdFromUser",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(regId),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
              

            }

        });
    });

    push.on('notification', function (data) {
        var message = '';
        message += data.message + ', ';
        message += data.title + ', ';
        message += data.count + ', ';
        //message += data.alert + ', ';
        //message += data.msgcnt + ', ';
        message += data.sound + ', ';
        message += data.image + ', ';
        message += data.additionalData + ', ';
        message += 'data.additionalData.foreground = ' + data.additionalData.foreground + ', ';
        message += 'data.additionalData.coldstart = ' + data.additionalData.coldstart + ', ';
        $('#resDiv').text(message);

        IconBadgeNumber = data.count;

        if (data.additionalData.foreground == true) {
            //var my_media3 = new Media("/android_asset/www/beep3.mp3",
            //    // success callback
            //    function () { /*alert("playAudio():Audio Success");*/ },
            //    // error callback
            //    function (err) { alert("playAudio():Audio Error: " + err); }
            //);
            //my_media3.play();
        }
    });

    push.setApplicationIconBadgeNumber(function () {
        console.log('success');
    }, function () {
        console.log('error');
    }, IconBadgeNumber);

    push.on('error', function (e) {
        //alert(e.message);
    });
}

document.addEventListener('deviceready', onDeviceReady, true);