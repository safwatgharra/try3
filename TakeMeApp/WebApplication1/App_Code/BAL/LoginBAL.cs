using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.App_Code.DAL;

/// <summary>
/// Summary description for Login
/// </summary>
public class LoginBAL
{
    LoginDBService loginDb = new LoginDBService();
    public LoginBAL()
    {
        //STAM5
        // TODO: Add constructor logic here
        //
    }

    public string LoginUserUsingClass(string userid, string userpass)
    {
        return loginDb.LoginUserUsingClass(userid, userpass);
    }
}