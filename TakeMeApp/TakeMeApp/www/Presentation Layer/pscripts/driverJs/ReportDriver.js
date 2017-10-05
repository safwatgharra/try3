var NextHazard;
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
$(document).ready(function myfunction() {
    getNextIndex();

    $('#ReportDateTimeTXT').val(today);

    $('#btnCamera').click(function () {
        navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });
    });

    $(".addReport").click(function () {
        var newImg = "hazard" + NextHazard + ".jpg";
        ReportSelector = $('#ReportSelector').val();
        ReportDescription = $('#ReportDescription').val();

        var hazard = {
            userID: localStorage.userid,
            date: today,
            type: ReportSelector,
            description: ReportDescription,
            path: newImg
        };

        $.ajax({
            url: WebServiceURL + "/HazardReport",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(hazard),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                alert("הדיווח נשלח");
                var res = data.d;
                var resOutput = JSON.parse(res);
                uploadPhoto(imageURI);
                window.location.replace("ReportDriver.html");
            }
        });


    });

    $(".ReportBack").click(function () {
        window.location.replace("homeDriver.html");
    });
});

function getNextIndex() {
    $.ajax({
        url: WebServiceURL + "/NextHazard",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var res = data.d;
            alert(res);
            NextHazard = res;
        }
    });

}

function onCameraSuccess(imageURI) {
    $('#btnCamera').attr('src', imageURI);
    sendFile(imageURI);
}

function sendFile(imageURI) {

    var formData = new FormData();
    formData.append('file', imageURI);
    $.ajax({
        type: 'post',
        url: 'http://ruppinmobile.ac.il.preview26.livedns.co.il/site11/images/ReturnValue.ashx',
        data: formData,
        success: function (status) {
            var my_path = "http://ruppinmobile.ac.il.preview26.livedns.co.il/site11/images/ReturnValue.ashx" + "hazard" + NextHazard+".jpg";
            $("#btnCamera").attr("src", my_path);
            alert(message);
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}

function uploadPhoto(imageURI) {
    //   Load(); // Start the spinning "working" animation
    var options = new FileUploadOptions(); // PhoneGap object to allow server upload
    options.fileKey = "file";
    options.fileName = "hazard" + NextHazard + ".jpg"; // file name
    options.mimeType = "image/jpeg"; // file type
    var params = {}; // Optional parameters
    params.value1 = "test";
    params.value2 = "param";

    options.params = params; // add parameters to the FileUploadOptions object
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://ruppinmobile.ac.il.preview26.livedns.co.il/site11/images/ReturnValue.ashx"), win, fail, options); // Upload
} // Upload Photo

function win(r) {
    var path = r.response;
    $('#btnCamera').attr("src", "http://ruppinmobile.ac.il.preview26.livedns.co.il/site11/images/ReturnValue.ashx" + "hazard" + NextHazard + ".jpg");
    // UnLoad(); // Stop "working" animation
} // win (upload success)

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}

function onCameraFail(message) {
    alert('Failed because: ' + message);
}