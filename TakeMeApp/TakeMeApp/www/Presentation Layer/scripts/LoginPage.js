var local = true;
var WebServiceURL = "http://localhost:63926/UsersWS.asmx"; //the same as above. only with…

if (!local) {
    WebServiceURL = "http://ruppinmobile.ac.il.preview26.livedns.co.il/site11/UsersWS.asmx";
}
$(document).ready(function () {
    $('#BtnLogin').click(function () {

        var UserID = $("#InputUserId").val();
        var UserPass = $("#InputUserPassword").val();
        var user =
            {
                userid: UserID,
                userpass: UserPass
            };


        window.location.replace("homeDriver.html");

        $.ajax({
            async: true,
            url: WebServiceURL + "/LoginUserUsingClass",
            dataType: "json",
            data: JSON.stringify(user),
            method: "post",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
            
                var res = data.d;
                var resOutput = JSON.parse(res);
                alert("res-", res);
                alert("resOutput=", resOutput);

                if (resOutput != "Faild") {
                    addUserToLocalStorage();
                    changePages(resOutput);
                }
            }
            , error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
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