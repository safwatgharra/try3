$(document).ready(function myfunction() {
   
    $("#MenuOpen").click(function () {
        $("#divMenu").addClass('borderMenu');
        $("#divMenu").css("width", "50%");
    });

    $("#MenuClose").click(function () {
        $("#divMenu").removeClass('borderMenu');
      $("#divMenu").css("width", "0%");

    });

    $(".BtnOrder").click(function () {
        $("#divOrder").addClass('borderOrder');
        $("#divOrder").css({ "height": "65%", "width": "78%"});
    });

    $(".OrderClose , .addOrder").click(function () {

        $("#divOrder").css({ "height": "0%","width":"0%"});
        $("#divOrder").removeClass('borderOrder');       
    });  

    $("#myOrders").click(function () {

        window.location.replace("OrdersPage.html");
    });   

});