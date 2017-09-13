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
        window.location.replace("mapDriver.html");
    });
});