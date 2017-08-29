

$(document).ready(function () {
    
    $('#BtnLogin').click(function () {
        movetoHomeSutudent($('#InputUserName').val(), $('#InputUserPassword').val());
        
    });
});

function movetoHomeSutudent(username, password) {

    window.location.replace("homeStudent.html");
}