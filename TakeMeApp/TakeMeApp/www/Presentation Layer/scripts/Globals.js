var local = true;
var WebServiceURL = "http://localhost:63926/UsersWS.asmx"; //the same as above. only with…
if (!local) {
    WebServiceURL = "http://ruppinmobile.ac.il.preview26.livedns.co.il/site11/UsersWS.asmx";
}



function formatErrorMessage(jqXHR, exception) {
    if (jqXHR.status === 0) {
        return ('Not connected.\nPleaseverify your network connection.');
    } else if (jqXHR.status == 404) {
        return ('The requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        return ('Internal Server Error [500].');
    } else if (exception === 'parsererror') {
        return ('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        return ('Time out error.');
    } else if (exception === 'abort') {
        return ('Ajax request aborted.');
    } else {
        return ('Uncaught Error.\n' + jqXHR.responseText);
    }
}