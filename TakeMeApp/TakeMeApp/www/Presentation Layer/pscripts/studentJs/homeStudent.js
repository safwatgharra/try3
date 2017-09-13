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
        $("#divOrder").css({ "height": "50%", "width": "78%" });
        fillStreetLocationSelect();
    });

    //$(".addOrder").click(function () {
    //    creatOrderObj();
    //    $.ajax({
    //        url: "",
    //        dataType: "json",
    //        type: "POST",
    //        data: JSON.stringify(order),
    //        contentType: "application/json; charset=utf-8",
    //        error: function (jqXHR, exception) {
    //            alert(formatErrorMessage(jqXHR, exception));
    //        },
    //        success: function (data) {
    //            var res = data.d;
    //            var resOutput = JSON.parse(res);
    //            alert("res-" + res);

    //            if (resOutput != null) {
    //                alert("ההזמנה נשלחה");

    //            }
    //            else {
    //                alert("קיימת תקלת קלט נא לבדוק את אחד הנתונים");
    //            }
    //        }
    //    });

    //    $("#divOrder").css({ "height": "0%", "width": "0%" });
    //    $("#divOrder").removeClass('borderOrder');
    //});

    $(".OrderClose").click(function () {

        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
    });

    $("#myOrders").click(function () {

        window.location.replace("OrdersPage.html");
    });

    //______________________Take me___________________
    $("#divImagCir").click(function () {

        window.location.replace("mapStudent.html");
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
        //async: true,
        url: WebServiceURL + "/LoadLocations",
        dataType: "json",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var res = data.d;
            alert(res);
            var result = JSON.parse(res);
            var x = document.getElementById("streetSelector");
            var lenenenene = x.length;
            while (lenenenene >= 0) {
                x.remove(lenenenene--);
            }
            for (var i = 0; result[i] != null; i++) {
                $("#streetSelector").append('<option value="' + i + '">' + result[i].LocationName + '</option>');
            }
        },
        fail: function () {
            alert("error");
        }
    });
}

function creatOrderObj() {
    var newDate = $('#OrderDateTimeTXT').val();
    var newStreet = $("#streetSelector").val();
    var newDes = $("#OrderDescription").val();

    var order = {
        uid: localStorage.uid,
        dt: newDate,
        strid: newStreet,
        des: newDes,
        //lat: newLat,
        //lng: newLng
    }
}

