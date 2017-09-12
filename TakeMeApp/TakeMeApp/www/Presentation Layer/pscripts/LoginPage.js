$(document).ready(function () {
    $('#BtnLogin').click(function () {
        var UserID = $("#InputUserId").val();
        var UserPass = $("#InputUserPassword").val();
        var user =
            {
                userid: UserID,
                userpass: UserPass
            };

        $.ajax({
            url: WebServiceURL + "/LoginUserUsingClass",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(user),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                var res = data.d;
                var resOutput = JSON.parse(res);
                alert("res-" + res);
                if (resOutput != null) {
                    addUserToLocalStorage(resOutput);
                    changePages(resOutput);
                }
                else {
                    alert("User Not Found!");
                }
            }

        });
     
    });
});

function addUserToLocalStorage(result) {
    localStorage.userid = result.UserID;
    localStorage.username = result.UserLName + " " + result.UserFName;
    localStorage.TypeOfuser = result.TypeCode;
}

function changePages(result) {
    if (result.TypeCode == '1') {
      window.location.replace("../pagesStudent/homeStudent.html");
    }

    else if (result.TypeCode == '2') {
        window.location.replace("../pagesDriver/homeDriver.html");
    }
}