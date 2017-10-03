$(document).ready(function myfunction() {
    LoadRequests();

    $("#backOrders").click(function () {
        window.location.replace("homeStudent.html");
    });

    $(".OrderClose").click(function () {
        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
    });

    $("#removeRow").click(function () {

        var ndx = $(this).parent().index() + 1;
        $("td", event.delegateTarget).remove();
    });

    $(".btnPlus").click(function () {
        $("#divOrder").addClass('borderOrder');
        $("#divOrder").css({ "height": "52%", "width": "78%" });
    });

    $(".addOrder").click(function () {
        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
    });

});

function LoadRequests() {

    var userid = {
        userid: localStorage.userid
    };
     $.ajax({
         url: WebServiceURL + "/LoadRequests",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(userid),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var res = data.d;
            alert("res-" + res);
        }

    });

}