﻿$(document).ready(function myfunction() {

    $("#backOrders").click(function () {
        window.location.replace("homeStudent.html");
    });

    $("#removeRow").click(function () {
        var ndx = $(this).parent().index() + 1;
        $("td", event.delegateTarget).remove();
    });

    $(".btnPlus").click(function () {
        $("#divOrder").addClass('borderOrder');
        $("#divOrder").css({ "height": "65%", "width": "78%" });
    });

    $(".OrderClose , .addOrder").click(function () {

        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
    });

    $("#myOrders").click(function () {

        window.location.replace("OrdersPage.html");
    });  


});