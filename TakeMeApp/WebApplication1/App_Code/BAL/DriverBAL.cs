using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.App_Code.DAL;

namespace WebApplication1.App_Code.BAL
{
    public class DriverBAL
    {
        DriverDBService driverdb = new DriverDBService();
        public DriverBAL()
        {

        }
        public void StartWorking (string date,string time,int userID)
        {
            driverdb.StartWorking(date, time, userID);
        }

        public void EndtWorking(string date, string time, int userID)
        {
            driverdb.EndtWorking(date, time, userID);
        }
        public string GetRequests()
        {
            return driverdb.GetRequests();
        }
    }
}