
var coordsLat = 1;
var coordsLng = 1;

var TakeMe = {
    date: 0,
    userID: localStorage.userid,
    longi: coordsLng,
    lati: coordsLat
};



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

    //__________________order view____________________
    $(".BtnOrder").click(function () {
  $("#divOrder").addClass('borderOrder');
        $("#divOrder").css({ "height": "65%", "width": "78%" });
        fillStreetLocationSelect();
    });

    $(".addOrder").click(function () {
        var street = $("#streetSelector").val()*1+1;
      
        var date = new Date($('#OrderDateTXT').val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        var fullDate = [month, day, year].join('/');
        var time = $("#OrderTimeTXT").val();
        var dateTime = fullDate + " " + time;


        

        var order = {
            date: dateTime,
            locationID: street,
            userID: localStorage.userid
        };


        $.ajax({
            url: WebServiceURL + "/InsertRequest",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(order),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
                var resOutput = JSON.parse(res);
                alert("ההזמנה נשלחה");
            }
        });

        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
    });

    $(".OrderClose").click(function () {

        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
    });

    $("#myOrders").click(function () {
        window.location.replace("OrdersPage.html");
    });

    //______________________Take me___________________
    $("#divImagCir").click(function () {
        

        var dt = new Date();
        var Time = (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var date = month + "/" + day + "/" + d.getFullYear();
        var DateTime = date + " " + Time;
        TakeMe.date = DateTime;

        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function (pos) {
                alert(pos.coords.latitude);
                alert(pos.coords.longitude);
                TakeMe.longi = pos.coords.longitude;
                TakeMe.lati = pos.coords.latitude;
                TakeMe.date = DateTime;
                $.ajax({
                    url: WebServiceURL + "/TakeMe",
                    data: JSON.stringify(TakeMe),
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    error: function (jqXHR, exception) {
                        alert(formatErrorMessage(jqXHR, exception));
                    },
                    success: function (data) {
                        var res = data.d;
                       
                        window.location.replace("mapStudent.html");
                    }
                });
            },
                function (error) {
                alert("Error");
                },
            {});
        }
       
    });

    //_____________________________log out____________
    $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.replace("../pageLogin/LoginPage.html");
    });
});

//order view function
function fillStreetLocationSelect() {

    $.ajax({
        url: WebServiceURL + "/LoadLocations",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var res = data.d;
            var result = JSON.parse(res);
            var x = document.getElementById("streetSelector");
            var lenenenene = x.length;
            while (lenenenene >= 0) {
                x.remove(lenenenene--);
            }
            for (var i = 0; result[i].LocationName != 'מיידי'; i++) {
                $("#streetSelector").append('<option value="' + i + '">' + result[i].LocationName + '</option>');
            }
        }
    });
}



