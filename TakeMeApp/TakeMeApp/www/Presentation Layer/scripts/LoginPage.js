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
                alert("res-"+ res);
                alert("resOutput="+ resOutput);

                if (resOutput != null) {
                    //addUserToLocalStorage();
                    changePages(resOutput);
                }
                else {
                    alert("error user");
                }
            }
            
        });
    });
});

function addUserToLocalStorage() {
    localStorage.UserID = resOutput.UserID;
    localStorage.username = resOutput.UserLName + " " + resOutput.UserFName;
    localStorage.TypeOfuser = resOutput.TypeCode;
}

function changePages(result) {
    if (result.TypeCode == '1') {
        window.location.replace("homeStudent.html");
    }

    else if (result.TypeCode == '2') {
        window.location.replace("homeDriver.html");
    }
}