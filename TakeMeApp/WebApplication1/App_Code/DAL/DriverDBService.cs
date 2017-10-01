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

        public string LoadPreOrders(string todaydate)
        {
            string query = "SELECT  dbo.RequestTB.UserID, dbo.LocationTB.long, dbo.LocationTB.lat " +
                          "FROM    dbo.LocationTB INNER JOIN dbo.RequestTB ON dbo.LocationTB.LocationID = dbo.RequestTB.LocationID " +
                          "WHERE(dbo.RequestTB.RequestTypeID = '2' and [RequestStatus]=1 and cast([RequestDate] as date)='" + todaydate + "')";
            string tblname = "preOrder";
            return Table(query, tblname);
        }

        public string LoadImmediateOrders()
        {
            string query = "SELECT [UserID],[long],[lat] FROM [RequestTB] " +
                           "where[RequestTypeID] = 1 and [RequestStatus]=1";
            string tblname = "immidiate";
            return Table(query, tblname);
           
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
    }
}