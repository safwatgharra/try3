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
        SqlConnection con;
        public RequestDBService()
        {
            strCon = DBGlobals.strCon;
            con = new SqlConnection(strCon);
        }


        public string Table(string query, string TableName)
        {
            try
            {

                SqlDataAdapter adptr = new SqlDataAdapter(query, con);
                DataSet ds = new DataSet();
                adptr.Fill(ds, TableName);
                DataTable dt = ds.Tables[TableName];
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                return json;
            }
            catch (Exception e)
            {
                con.Close();
                return e.Message;
            }
        }
        public string Execute(string query, string msg)
        {
            try
            {
                con.Open();
                SqlCommand com = new SqlCommand(query, con);
                if (com.ExecuteNonQuery() > 0)
                {
                    com.Connection.Close();
                    return msg;
                }
                else
                {
                    com.Connection.Close();
                    return "try again";
                }

            }
            catch (Exception e)
            {
                con.Close();
                return e.Message;
            }
        }

        public string insertRegIdFromUser(string regId,int userId)
        {
            string query = " UPDATE[dbo].[NewUsersTB] SET [UDID] ='"+regId+"' WHERE UserID = "+ userId;
            string msg = "reg id inserted";
            return Execute(query, msg);


        }

        public string LoadDriverWP(int driverUserID)
        {
            string query = "  SELECT [CurrentLong],[Currentlat] " +
                           " FROM [NewUsersTB] " +
                           " WHERE UserID = " + driverUserID;
            string tblname = "driver current location";
            return Table(query, tblname);
        }

        public string RequestUser(int UserID)
        {
            string query = "  SELECT dbo.RequestTB.RequestDate, dbo.LocationTB.LocationName " +
                    " FROM dbo.RequestTB INNER JOIN  dbo.LocationTB ON dbo.RequestTB.LocationID = dbo.LocationTB.LocationID" +
                    " WHERE UserID = '" + UserID + "' and RequestTypeID = 2 and [RequestStatus]=1";
            string tblname = "Requests";
            return Table(query, tblname);

        }

        public string LoadLocatins()
        {
            string query = "SELECT * FROM[LocationTB]";
            string tblname = "locations";
            return Table(query, tblname);

            //SqlConnection con = new SqlConnection(strCon);
            //List<Location> loc = new List<Location>();
            //SqlCommand com = new SqlCommand(" SELECT * FROM [LocationTB]", con);
            //con.Open();
            //SqlDataReader reader = com.ExecuteReader();

            //while (reader.Read())
            //{
            //    Location location = new Location
            //    {
            //        LocationID = Convert.ToInt16(reader["LocationID"]),
            //        LocationName = reader["LocationName"].ToString(),
            //        Longi = reader["Long"].ToString(),
            //        Lati=reader["lat"].ToString()
            //    };
            //    loc.Add(location);
            //}
            //return serializer.Serialize(loc);


            //needs the newtonsoft.json from nuget packages!

        }

        public string RemoveReqDB(string datetime, int userID)
        {
            string query = "DELETE FROM [dbo].[RequestTB]" +
                           " WHERE UserID =" + userID + "and RequestDate='" + datetime + "'";
            string msg = "your requset removed";
            return Execute(query, msg);

        }

        public string InsertReqDB(string date, int locationID, int userID)//type : 1- immediatly , 2- pre-order
        {
            string query = "INSERT INTO [dbo].[RequestTB]" +
                           "([RequestDate],[LocationID],[RequestTypeID],[UserID],[RequestStatus])" +
                           "VALUES ('" + date + "'," + locationID + ",2," + userID + ",1)";
            string msg = "Your request has been received";
            return Execute(query, msg);

        }

        public string TakeMe(string date, int userID, string longi, string lati)
        {
            string query = "INSERT INTO [dbo].[RequestTB]" +
                                 "([RequestDate],[LocationID],[RequestTypeID],[UserID],[RequestStatus],[long],[lat])" +
                                    "VALUES ('" + date + "' ,'99', 1 ," + userID + ",'1','" + longi + "','" + lati + "')";
            string msg = "Your request has been received";
            return Execute(query, msg);
        }
    }
}