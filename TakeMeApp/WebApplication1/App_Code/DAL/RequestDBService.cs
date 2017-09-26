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
        public string Execute(string query,string msg)
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

        public string RequestUser(int UserID)
        {
            try
            {
                
                SqlDataAdapter adptr = new SqlDataAdapter(
                    "  SELECT dbo.RequestTB.RequestDate, dbo.LocationTB.LocationName " +
                    " FROM dbo.RequestTB INNER JOIN  dbo.LocationTB ON dbo.RequestTB.LocationID = dbo.LocationTB.LocationID" +
                    " WHERE UserID = '" + UserID + "' and RequestTypeID = 2 and [RequestStatus]=1", con);
                

                DataSet ds = new DataSet();
                adptr.Fill(ds, "Requests");
                DataTable dt = ds.Tables["Requests"];

                //needs the newtonsoft.json from nuget packages!
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                con.Close();
                return json;
            }
            catch (Exception e)
            {
                con.Close();
                return e.Message;
            }
        }

        public string LoadLocatins()
        {
            try
            {
                SqlDataAdapter adptr = new SqlDataAdapter("SELECT * FROM [LocationTB]", con);

                DataSet ds = new DataSet();
                adptr.Fill(ds, "locations");
                DataTable dt = ds.Tables["locations"];

                //needs the newtonsoft.json from nuget packages!
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                con.Close();
                return json;
            }
            catch (Exception e)
            {
                con.Close();
                return e.Message;
            }

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

        public string  RemoveReqDB(string date, int locationID, int userID)
        {
            try
            {
                con.Open();

                SqlCommand com = new SqlCommand("DELETE FROM [dbo].[RequestTB]" +
                                                " WHERE UserID =" + userID + " and LocationID =" + locationID +
                                                "and RequestDate='" + date + "'", con);//we have to check if the string date is working 


                if(com.ExecuteNonQuery()>0)
                {
                    com.Connection.Close();
                    return "your requset removed";
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

        public string InsertReqDB(string date, int locationID, int userID)//type : 1- immediatly , 2- pre-order
        {
            try
            {
                con.Open();
                SqlCommand com = new SqlCommand("INSERT INTO [dbo].[RequestTB]" +
                                 "([RequestDate],[LocationID],[RequestTypeID],[UserID],[RequestStatus])" +
                                    "VALUES ('" + date + "'," + locationID + ",2," + userID + ",1)", con);//we have to check if the string date is working 


                if(com.ExecuteNonQuery()>0)
                {
                    com.Connection.Close();
                    return "Your request has been received";
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

        public string TakeMe(string date, int userID, string longi, string lati)
        {
            try
            {
                con.Open();

                SqlCommand com = new SqlCommand("INSERT INTO [dbo].[RequestTB]" +
                                 "([RequestDate],[LocationID],[RequestTypeID],[UserID],[RequestStatus],[long],[lat])" +
                                    "VALUES ('" + date + "' ,'99', 1 ," + userID + ",'1','" + longi + "','" + lati + "')", con);//we have to check if the string date is working 


                if (com.ExecuteNonQuery() > 0)
                {
                    com.Connection.Close();
                    return "Your request has been received";
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
    }
}