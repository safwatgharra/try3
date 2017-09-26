using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;
namespace WebApplication1.App_Code.DAL
{
    public class LoginDBService
    {
        string strCon;
        JavaScriptSerializer serializer = new JavaScriptSerializer();


        public LoginDBService()
        {
            strCon = DBGlobals.strCon;
        }

        public string LoginUserUsingClass(string userid, string userpass)
        {

            User user = null;
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand com = new SqlCommand("select * from UsersTB where UserID = @UserID and UserPass = @UserPass", con);
            com.Parameters.Add(new SqlParameter("@UserID", userid));
            com.Parameters.Add(new SqlParameter("@UserPass", userpass));

            con.Open();
            SqlDataReader reader = com.ExecuteReader();


            if (reader.Read())
            {
                user = new User(Convert.ToInt16(reader["UserID"]), reader["UserFName"].ToString(), reader["UserLName"].ToString(), reader["PhoneNumber"].ToString(), reader["UDID"].ToString(), reader["CurrentLong"].ToString(), reader["CurrentLat"].ToString(), Convert.ToChar(reader["TypeCode"]));

            }
            com.Connection.Close();
            return serializer.Serialize(user);
            //else
            //{
            //    com.Connection.Close();
            //    return serializer.Serialize("Failed");
            //}

        }
    }
}