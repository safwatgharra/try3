using System;
using System.Collections.Generic;
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

        internal void EndtWorking(string date, string time, int userID)
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