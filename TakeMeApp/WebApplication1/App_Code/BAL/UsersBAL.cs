using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for UsersBAL
/// </summary>
public class UsersBAL
{
    UsersDbService usersDb = new UsersDbService();
    public UsersBAL()
    {
       
    }

    public string GetAllUsers() {
         return usersDb.GetAllUsers();
    }
}