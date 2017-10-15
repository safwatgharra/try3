using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;
namespace WebApplication1.App_Code.DAL
{
    public class LoginDBService
    {
        static string strCon;
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        SqlConnection con;


        public LoginDBService()
        {
            strCon = DBGlobals.strCon;
            con = new SqlConnection(strCon);
        }
        
        public string LoginUserUsingClass(string userid, string userpass)
        {

            User user = null;
            try
            {
                con.Open();
                SqlCommand com = new SqlCommand("select * from NewUsersTB where UserID = @UserID and UserPass = @UserPass", con);
                com.Parameters.Add(new SqlParameter("@UserID", userid));
                com.Parameters.Add(new SqlParameter("@UserPass", userpass));

                
                SqlDataReader reader = com.ExecuteReader();


                if (reader.Read())
                {
                    user = new User(Convert.ToInt16(reader["UserID"]), reader["UserFName"].ToString(), reader["UserLName"].ToString(), reader["PhoneNumber"].ToString(), reader["RegID"].ToString(), reader["CurrentLong"].ToString(), reader["CurrentLat"].ToString(), Convert.ToChar(reader["TypeCode"]));

                }
                con.Close();
                return serializer.Serialize(user);
            }
            catch(Exception e)
            {
                con.Close();
                return e.Message;
            }
            //else
            //{
            //    com.Connection.Close();
            //    return serializer.Serialize("Failed");
            //}

        }
    }
}