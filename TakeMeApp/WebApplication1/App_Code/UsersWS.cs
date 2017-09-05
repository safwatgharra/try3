using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for UsersWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UsersWS : System.Web.Services.WebService
{
    
    public UsersWS()
    {
    }
    

    [WebMethod]
    public string LoginUserUsingClass(string userid, string userpass)
    {
        LoginBAL loginBal = new LoginBAL();
        return loginBal.LoginUserUsingClass(userid, userpass);
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "hello";
    }

    [WebMethod]
    public string GetAllUsers()
    {
        UsersBAL users = new UsersBAL();
        return users.GetAllUsers();
    }

   
}


