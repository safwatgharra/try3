using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Login
/// </summary>
public class LoginBAL
{
    LoginDBService loginDb = new LoginDBService();
    public LoginBAL()
    {
        //STAM4
        // TODO: Add constructor logic here
        //
    }

    public string LoginUserUsingClass(string name, string password)
    {
        return loginDb.LoginUserUsingClass(name, password);
    }
}