var removeid;
var str;
var date;
var index
var Remove;
$(document).ready(function myfunction() {

    LoadRequests();

    //$(this).click(function (e) {

    //    alert(e.target.id.toString());
    //});
    $(this).click(function (e) {
        removeid = "";
        str = (e.target.id.toString());
        for (var i = 0; i < str.length - 1; i++) {
            removeid += str[i];
        }
        if (removeid == "removeRow") {
         index = str[str.length - 1];
           date = $('#td' + index).text();

       Remove =
                {
                    datetime: date,
                    userID: localStorage.userid
                };

            $.ajax({
                url: WebServiceURL + "/UpdateRequest",
                dataType: "json",
                type: "POST",
                data: JSON.stringify(Remove),
                contentType: "application/json; charset=utf-8",
                error: function (jqXHR, exception) {
                    alert(formatErrorMessage(jqXHR, exception));
                },
                success: function (data) {
                    var res = data.d;
                    alert("ההזמנה נמחקה");
                }
            });
            $(".td" + index).remove();
        }

    });

    $("#backOrders").click(function () {
        window.location.replace("homeStudent.html");
    });

    $(".OrderClose").click(function () {
        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
    });

    $(".btnPlus").click(function () {
        fillStreetLocationSelect();
        $("#divOrder").addClass('borderOrder');
        $("#divOrder").css({ "height": "66%", "width": "78%" });
    });

    $(".addOrder").click(function () {
        var street = $("#streetSelector").val() * 1 + 1;

        var date = new Date($('#OrderDateTXT').val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        var fullDate = [month, day, year].join('/');
        var time = $("#OrderTimeTXT").val();
        var dateTime = fullDate + " " + time;

        var order = {
            date: dateTime,
            locationID: street,
            userID: localStorage.userid
        };

        $.ajax({
            url: WebServiceURL + "/InsertRequest",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(order),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
                var resOutput = JSON.parse(res);
                alert("ההזמנה נשלחה");
            }
        });
        $("#divOrder").css({ "height": "0%", "width": "0%" });
        $("#divOrder").removeClass('borderOrder');
        LoadRequests();
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
                $('#table').append('<tr class="td' + i + '"><td><img src="../images/minus.png" id="removeRow' + i + '" /></td><td id="td' + i + '">' + result[i].RequestDate + '</td><td>' + result[i].LocationName + '</td></tr>');
            }
        }
    });

}

function fillStreetLocationSelect() {

    $.ajax({
        url: WebServiceURL + "/LoadLocations",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var res = data.d;
            var result = JSON.parse(res);
            var x = document.getElementById("streetSelector");
            var lenenenene = x.length;
            while (lenenenene >= 0) {
                x.remove(lenenenene--);
            }
            for (var i = 0; result[i].LocationName != 'מיידי'; i++) {
                $("#streetSelector").append('<option value="' + i + '">' + result[i].LocationName + '</option>');
            }
        }
    });
}