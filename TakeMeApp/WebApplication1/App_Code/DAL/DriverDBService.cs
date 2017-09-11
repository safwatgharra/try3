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
        string strCon;
        public DriverDBService()
        {
            strCon = DBGlobals.strCon;
        }
        public string GetRequests()
        {
            SqlConnection con = new SqlConnection(strCon);
            SqlDataAdapter adptr = new SqlDataAdapter("SELECT dbo.RequestTB.RequestDate, dbo.LocationTB.LocationName, dbo.RequestTB.UserID " +
                "FROM  dbo.LocationTB INNER JOIN dbo.RequestTB ON dbo.LocationTB.LocationID = dbo.RequestTB.LocationID " +
                "WHERE(dbo.RequestTB.RequestTypeID = '2') order by RequestDate ", con);


            DataSet ds = new DataSet();
            adptr.Fill(ds, "pre-order");
            DataTable dt = ds.Tables["pre-order"];

            //needs the newtonsoft.json from nuget packages!
            string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return json;
        }
        public void StartWorking(string date,string time,int userID)
        {
            SqlConnection con = new SqlConnection(strCon);

            SqlCommand com = new SqlCommand("INSERT INTO [dbo].[AttindanceReportDB]" +
                " ([WorkDayDate],[WorkStart],[WorkEnd],[UserID],[IsAvaible])" +
                " VALUES ('" + date + "' ,'" + time +"','',"+userID+",1)", con);//we have to check if the string date is working 

            con.Open();
            SqlDataReader reader = com.ExecuteReader();
            com.Connection.Close();
        }

        public void EndtWorking(string date, string time, int userID)
        {
            SqlConnection con = new SqlConnection(strCon);

            SqlCommand com = new SqlCommand("UPDATE[dbo].[AttindanceReportDB] SET  [WorkEnd] = '" + time + "',[IsAvaible] = 0" +
                " WHERE[UserID] = " + userID + "and[WorkDayDate] = '" + date +"'", con); 
            con.Open();
            SqlDataReader reader = com.ExecuteReader();
            com.Connection.Close();

        }
}
}