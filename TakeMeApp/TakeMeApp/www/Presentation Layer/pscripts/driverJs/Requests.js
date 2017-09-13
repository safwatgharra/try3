$(document).ready(function myfunction() {

    $("#backOrders").click(function () {
        window.location.replace("mapDriver.html");
    });

    $("#removeRow").click(function () {

        var ndx = $(this).parent().index() + 1;
        $("td", event.delegateTarget).remove();
    });

});