$(document).ready(function myfunction() {

    $("#MenuOpen").click(function () {
        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css("width", "211px");
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
      $("#divMenu").css("width", "0px");

    });

    $(".BtnOrder").click(function () {
        $("#divOrder").addClass('borderOrder');
        $("#divOrder").css({ "height": "63%", "width": "78%"});
    });

    $(".OrderClose , .addOrder").click(function () {

        $("#divOrder").css({ "height": "0px","width":"0px"});
        $("#divOrder").removeClass('borderOrder');       
    });  

    $("#myOrders").click(function () {

        window.location.replace("OrdersPage.html");
    });  


});