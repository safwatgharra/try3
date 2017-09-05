using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication1.App_Code.DAL
{
    public class RequestDBService
    {
        string strCon;
        public RequestDBService()
        {
            strCon = DBGlobals.strCon;
        }

        

        public string RequestUser(int UserID)
        {
            SqlConnection con = new SqlConnection(strCon);
            SqlDataAdapter adptr = new SqlDataAdapter(
                " SELECT * " +
                " FROM RequestTB WHERE UserID = '"+UserID+"' and UserPass = '2'", con);


            DataSet ds = new DataSet();
            adptr.Fill(ds, "Requests");
            DataTable dt = ds.Tables["Requests"];

            //needs the newtonsoft.json from nuget packages!
            string json =JsonConvert.SerializeObject(dt, Formatting.Indented);
            return json;
        }
        //public void InsertReqDB(string date, int locationID, int userID)
        //{
        //    User user = null;
        //    SqlConnection con = new SqlConnection(strCon);
        //    SqlCommand com = new SqlCommand("INSERT INTO [dbo].[RequestTB]" +
        //                     "([RequestDate],[LocationID],[RequestTypeID],[UserID],[RequestStatus])" +
        //                        "VALUES ("+, 2, 2, 1, 2)", con);
        //    com.Parameters.Add(new SqlParameter("@UserID", userID));
        //    com.Parameters.Add(new SqlParameter("@UserPass", password));

        //    con.Open();
        //    SqlDataReader reader = com.ExecuteReader();
        //    com.Connection.Close();
        //}
    }
}