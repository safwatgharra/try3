$(document).ready(function myfunction() {

    $('img').click(function () {
        alert($(this).get());
    });

    $("#btn").click(function () {
        LoadRequests();
    });

    $("#backOrders").click(function () {
        window.location.replace("homeStudent.html");
    });

    $(".OrderClose").click(function () {
        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
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
            var res = data.d;
            var result = JSON.parse(res);
            var i = 0;
            for (var i = 0; result[i] != null; i++) {
                $('#table').append('<tr id="td' + i + '"><td><img src="../images/minus.png" id="removeRow' + i + '" /></td><td id="td' + i + '">' + result[i].RequestDate + '</td><td>' + result[i].LocationName + '</td></tr>');
            }
        }
    });

}