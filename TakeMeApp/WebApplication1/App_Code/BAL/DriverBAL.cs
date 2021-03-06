﻿using System;
using System.Collections.Generic;
using System.Data;
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
        public string StartWorking (string date,string time,int userID)
        {
            return driverdb.StartWorking(date, time, userID);
        }

        public string  EndtWorking(string date, string time, int userID)
        {
            return driverdb.EndtWorking(date, time, userID);
        }
        //public string GetRequests()
        //{
        //    return driverdb.GetRequests();
        //}

        public string StartBreak(int userID, string date)
        {
            return driverdb.StartBreak(userID, date);
        }

        public string EndtBreak(int userID, string date)
        {
            return driverdb.EndtBreak(userID, date);
        }
        public string LoadImmediateOrders()
        {
            return driverdb.LoadImmediateOrders();
        }
        public string LoadPreOrders(string todaydate)
        {
            return driverdb.LoadPreOrders(todaydate);
        }
        public string ChangeReqStatus(string datetime,int userID,int driverID)
        {
            return driverdb.ChangeReqStatus(datetime, userID,driverID);
        }
        public string NextHazard()
        {
            return driverdb.NextHazard();
        }
        public string HazardReport(int userID, string date, string type, string description, string path)
        {
            return driverdb.HazardReport(userID, date, type, description, path);
        }
        public string UpdateWayPoint(int userID, string lat, string longi)
        {
            return driverdb.UpdateWayPoint(userID, lat, longi);
        }
        public string FinishRide(int driverID)
        {
            return driverdb.FinishRide(driverID);
        }
        public string GetRegID(int userID)
        {
            return driverdb.GetRegID(userID);
        }
        

    }
}