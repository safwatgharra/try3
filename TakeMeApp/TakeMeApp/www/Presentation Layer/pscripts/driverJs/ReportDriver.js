$(document).ready(function myfunction() {
    fillDateTimeTXt();

    $(".ReportBack").click(function () {
        window.location.replace("homeDriver.html");
    });
});

function fillDateTimeTXt() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    $('#ReportDateTimeTXT').val(today);
}   