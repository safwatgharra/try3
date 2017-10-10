using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using WebApplication1.App_Code.DAL;
using System;

namespace WebApplication1.App_Code.BAL
{
    public class StudentBAL
    {
        RequestDBService studentdb = new RequestDBService();
        public StudentBAL()
        {

        }
        public string LoadLocations()
        {
            //return "ayoub";
            return studentdb.LoadLocatins();
        }
        public string LoadReguests(int userID)
        {
            return studentdb.RequestUser(userID);
        }
        public string InsertRequest(string date, int locationID, int userID)
        {
            string msg = studentdb.InsertReqDB(date, locationID, userID);
            if (msg == "Your request has been received")
                return studentdb.RequestUser(userID);
            else
                return msg;

        }
        public string UpdateRequest(string datetime,  int userID)
        {
            string msg = studentdb.RemoveReqDB(datetime, userID);
            if (msg == "your requset removed")
                return studentdb.RequestUser(userID);
            else
                return msg;
        }
        public string TakeMe(string date, int userID, string longi, string lati)
        {
            return studentdb.TakeMe(date, userID, longi, lati);
        }

        public string LoadDriverWP(int driverUserID)
        {
            return studentdb.LoadDriverWP(driverUserID);
        }
    }
}