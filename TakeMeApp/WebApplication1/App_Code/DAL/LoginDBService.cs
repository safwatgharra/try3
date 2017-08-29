using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for LoginDBService
/// </summary>
public class LoginDBService
{
    string strCon;
    JavaScriptSerializer serializer = new JavaScriptSerializer();


    public LoginDBService()
    {
        strCon = DBGlobals.strCon;
    }

    public string LoginUserUsingClass(string UserID, string password)
    {

        User user = null;
        SqlConnection con = new SqlConnection(strCon);
        SqlCommand com = new SqlCommand("select * from UsersTB where UserID = @UserID and UserPass = @UserPass", con);
        com.Parameters.Add(new SqlParameter("@UserID", UserID));
        com.Parameters.Add(new SqlParameter("@UserPass", password));

        try
        {
            con.Open();
            SqlDataReader reader = com.ExecuteReader();

            if (reader.Read())
            {
                user = new User(Convert.ToInt16(reader["UserID"]), reader["UserFName"].ToString(), reader["UserLName"].ToString(), reader["PhoneNumber"].ToString(), reader["UDID"].ToString(), reader["CurrentLocation"].ToString(), Convert.ToChar(reader["TypeCode"]));
                com.Connection.Close();
                return serializer.Serialize(user);

            }
        }
        catch
        {

        }
        finally
        {
            com.Connection.Close();
        }


        return serializer.Serialize(user);
    }
}