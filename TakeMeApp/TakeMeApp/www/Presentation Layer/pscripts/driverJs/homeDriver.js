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

        var output = d.getFullYear() + '/' +
            (month < 10 ? '0' : '') + month + '/' +
            (day < 10 ? '0' : '') + day;
 
        var dt = new Date();
        var time = (dt.getHours() < 10 ? '0' : '') + dt.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
        UserEW =
            {
                date: Date,
                time: time
                , userID: localStorage.userid
            };

        //$.ajax({
        //    url: WebServiceURL + "/StartWorking",
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

        //        if (resOutput != null) {

        //        }
        //        else {
        //            alert("User Not Found!");
        //        }
        //    }

        //});
        window.location.replace("mapDriver.html");
    });

    $("#logoutBtn").click(function () {
        localStorage.clear();
        window.location.replace("../pageLogin/LoginPage.html");
    });
});