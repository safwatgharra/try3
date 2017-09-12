using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication1.App_Code.BAL;
using System.Web.Script.Serialization;

namespace WebApplication1.App_Code.DAL
{
    public class RequestDBService
    {
        string strCon;
        JavaScriptSerializer serializer = new JavaScriptSerializer();
        public RequestDBService()
        {
            strCon = DBGlobals.strCon;

        }

        public string RequestUser(int UserID)
        {
            SqlConnection con = new SqlConnection(strCon);
            SqlDataAdapter adptr = new SqlDataAdapter(
                "  SELECT dbo.RequestTB.RequestDate, dbo.LocationTB.LocationName " +
                " FROM dbo.RequestTB INNER JOIN  dbo.LocationTB ON dbo.RequestTB.LocationID = dbo.LocationTB.LocationID" +
                " WHERE UserID = '" + UserID + "' and RequestTypeID = 2", con);


            DataSet ds = new DataSet();
            adptr.Fill(ds, "Requests");
            DataTable dt = ds.Tables["Requests"];

            //needs the newtonsoft.json from nuget packages!
            string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return json;
        }

        public string LoadLocatins()
        {
            SqlConnection con = new SqlConnection(strCon);
            List<Location> loc = new List<Location>();
            SqlCommand com = new SqlCommand(" SELECT * FROM [LocationTB]", con);
            con.Open();
            SqlDataReader reader = com.ExecuteReader();

            while (reader.Read())
            {
                Location location = new Location
                {
                    LocationID = Convert.ToInt16(reader["LocationID"]),
                    LocationName = reader["LocationName"].ToString(),
                    WayPoint = reader["WayPoint"].ToString()
                };
                loc.Add(location);
            }
            return serializer.Serialize(loc);


            //needs the newtonsoft.json from nuget packages!
            
        }

        public void RemoveReqDB(string date, int locationID, int userID)
        {
            SqlConnection con = new SqlConnection(strCon);

            SqlCommand com = new SqlCommand("DELETE FROM [dbo].[RequestTB]" +
                                            " WHERE UserID =" + userID + " and LocationID =" + locationID +
                                            "and RequestDate='" + date + "'", con);//we have to check if the string date is working 

            con.Open();
            SqlDataReader reader = com.ExecuteReader();
            com.Connection.Close();
        }

        public void InsertReqDB(string date, int locationID, int userID, int requestType)//type : 1- immediatly , 2- pre-order
        {
            SqlConnection con = new SqlConnection(strCon);

            SqlCommand com = new SqlCommand("INSERT INTO [dbo].[RequestTB]" +
                             "([RequestDate],[LocationID],[RequestTypeID],[UserID],[RequestStatus])" +
                                "VALUES ('" + date + "'," + locationID + "," + requestType + "," + userID + ",1)", con);//we have to check if the string date is working 

            con.Open();
            SqlDataReader reader = com.ExecuteReader();
            com.Connection.Close();
        }
    }
}