using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication1.App_Code.DAL
{
    public class DriverDBService
    {
        static string strCon;
        SqlConnection con;

        public DriverDBService()
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
                con.Close();
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
        //public string GetRequests()
        //{
        //    SqlConnection con = new SqlConnection(strCon);
        //    SqlDataAdapter adptr = new SqlDataAdapter("SELECT dbo.RequestTB.RequestDate, dbo.LocationTB.LocationName, dbo.RequestTB.UserID " +
        //        "FROM  dbo.LocationTB INNER JOIN dbo.RequestTB ON dbo.LocationTB.LocationID = dbo.RequestTB.LocationID " +
        //        "WHERE(dbo.RequestTB.RequestTypeID = '2') order by RequestDate ", con);


        //    DataSet ds = new DataSet();
        //    adptr.Fill(ds, "pre-order");
        //    DataTable dt = ds.Tables["pre-order"];

        //    //needs the newtonsoft.json from nuget packages!
        //    string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
        //    return json;
        //}
        public string ChangeReqStatus(string datetime,int userID,int DriverID)
        {
            //add push to student driver on his way

            string query = "UPDATE [dbo].[RequestTB]" +
                           " SET [RequestStatus] = 0" +
                           " WHERE[UserID] = " + userID + "and [RequestDate] = '" + datetime + "'";
            string msg = "driver on his way";
            Execute(query, msg);

            query = "INSERT INTO [dbo].[RidesTB]" +
                           " ([Date] ,[UserID] ,[DriverID] ,[RideStatus]) " +
                           " VALUES(cast('"+ datetime + "' as date)  , " + userID + "," + DriverID + ", 1)";

            return Execute(query, msg);

    

        }
        public string FinishRide(int driverID)
        {
            string query = "UPDATE [dbo].[RidesTB]" +
                          "set [RideStatus] = 0" +
                          "where [DriverID]=" + driverID;
            string msg = "ride done";
            return Execute(query, msg);
        }
        
        public string LoadPreOrders(string todaydate)
        {
            string query = "SELECT dbo.LocationTB.long, dbo.LocationTB.lat, dbo.NewUsersTB.UserID, dbo.NewUsersTB.UserFName, dbo.NewUsersTB.UDID, dbo.RequestTB.RequestDate" +
                            " FROM dbo.RequestTB INNER JOIN dbo.LocationTB ON dbo.LocationTB.LocationID = dbo.RequestTB.LocationID" +
                            " INNER JOIN dbo.NewUsersTB ON  dbo.NewUsersTB.UserID = dbo.RequestTB.UserID" +
                            " WHERE(dbo.RequestTB.RequestTypeID = '2' and [RequestStatus]=1 and cast([RequestDate] as date)='" + todaydate + "')";
            string tblname = "preOrder";
            return Table(query, tblname);
        }

        public string LoadImmediateOrders()
        {
            string query =  " SELECT dbo.RequestTB.RequestDate, dbo.RequestTB.UserID, dbo.RequestTB.long, dbo.RequestTB.lat, dbo.NewUsersTB.UserFName, dbo.NewUsersTB.UDID"+
                            " FROM dbo.RequestTB INNER JOIN dbo.NewUsersTB ON dbo.RequestTB.UserID = dbo.NewUsersTB.UserID"+
                            " where[RequestTypeID] = 1 and[RequestStatus] = 1";

            string tblname = "immidiate";
            return Table(query, tblname);
           
        }
        public string NextHazard()
        {
            string stmt = "select count (*) from [ReportsTB]";
            try
            {
                con.Open();
                SqlCommand com = new SqlCommand(stmt, con);
                string i = ((int)com.ExecuteScalar()+1).ToString();
                con.Close();
                return i;
            }
            catch (Exception e)
            {
                con.Close();
                return e.Message;
            }

        }
        public string HazardReport(int userID,string date,string type,string description,string path)
        {
            string query= "INSERT INTO [dbo].[ReportsTB]"+
                          "([UserID],[ReportDate],[ReportType],[ReportDescription],[img])"+
                          " VALUES('"+userID+"','"+date+"','"+type+"','"+description+"','"+path+"')";
            string msg = "successfully reported";
            return Execute(query, msg);
        }

        public string StartBreak(int userID, string date)
        {
            string query = "UPDATE [dbo].[AttindanceReportDB]" +
                           " SET[IsAvaible] = 0" +
                           " WHERE[UserID] = " + userID + "and[WorkDayDate] = '" + date + "'";
            string msg = "start break";
            return Execute(query, msg);
            
        }

        public string EndtBreak(int userID, string date)
        {
            string query = "UPDATE [dbo].[AttindanceReportDB]" +
                           " SET[IsAvaible] = 1" +
                           " WHERE[UserID] = " + userID + "and[WorkDayDate] = '" + date + "'";
            string msg = "end break";
            return Execute(query, msg);

           
        }

        public string StartWorking(string date, string time, int userID)
        {
            string query = "INSERT INTO [dbo].[AttindanceReportDB]" +
                           " ([WorkDayDate],[WorkStart],[WorkEnd],[UserID],[IsAvaible])" +
                           " VALUES ('" + date + "' ,'" + time + "',''," + userID + ",1)";
            string msg = "start working";
            return Execute(query, msg);
           
        }


        public string EndtWorking(string date, string time, int userID)
        {
            string query = "UPDATE[dbo].[AttindanceReportDB] SET  [WorkEnd] = '" + time + "',[IsAvaible] = 0" +
                           " WHERE[UserID] = " + userID + "and[WorkDayDate] = '" + date + "'";
            string msg = "End woeking";
            return Execute(query, msg);
        }
        public string UpdateWayPoint(int userID,string lat,string longi)
        {
            string query = "UPDATE [dbo].[NewUsersTB]" +
                           " SET [CurrentLong] =" + longi + ", [Currentlat] = " + lat +
                           " WHERE[UserID] = " + userID;
            string msg = "succefully updated";
            return Execute(query, msg);
        }
    }
}