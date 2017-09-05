

$(document).ready(function () {
    $('#BtnLogin').click(function () {

        var UserID = $("#InputUserId").val();
        var UserPass = $("#InputUserPassword").val();
        var user =
            {
                userid: UserID,
                userpass: UserPass
            };

           //  if (UserID==1) {
           // window.location.replace("homeStudent.html");
           //    }
           //     else if (UserID==2) {
           //window.location.replace("homeDriver.html");
           //    }
        alert(WebServiceURL + "/LoginUserUsingClass");

        $.ajax({
           
            url: WebServiceURL + "/HelloWorld",
            dataType: "json",
            data: "{}",
            type: "post",
            contentType: "application/json;charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {

                var res = data.d;
                var resOutput = JSON.parse(res);
                alert("res-", res);
                alert("resOutput=", resOutput);

                
            }

        });

        //$.ajax({
        //    async: true,
        //    url: WebServiceURL + "/LoginUserUsingClass",
        //    dataType: "json",
        //    data: JSON.stringify(user),
        //    method: "post",
        //    contentType: "application/json;charset=utf-8",
        //    error: function (jqXHR, exception) {
        //        alert(formatErrorMessage(jqXHR, exception));
        //    },
        //    success: function (data) {

        //        var res = data.d;
        //        var resOutput = JSON.parse(res);
        //        alert("res-", res);
        //        alert("resOutput=", resOutput);

        //        if (resOutput != null) {
        //            addUserToLocalStorage();
        //            changePages(resOutput);
        //        }
        //    }
            
        //});
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