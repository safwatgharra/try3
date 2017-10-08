using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using WebApplication1.App_Code.BAL;

/// <summary>
/// Summary description for UsersWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UsersWS : System.Web.Services.WebService
{
    
    public UsersWS()
    {
    }
    [WebMethod]
    public string TakeMe(string date, int userID, string longi, string lati)
    {
        StudentBAL req = new StudentBAL();
        return req.TakeMe(date, userID, longi, lati);
    }

    [WebMethod]
    public string LoadRequests(int userid)
    {
        StudentBAL reqBAL = new StudentBAL();
        return reqBAL.LoadReguests(userid);
    }
    [WebMethod]
    public string InsertRequest(string date, int locationID, int userID)
    {
        StudentBAL reqBAL = new StudentBAL();
        return reqBAL.InsertRequest(date, locationID, userID);
    }
    [WebMethod]
    public string UpdateRequest(string datetime,  int userID)
    {
        StudentBAL reqBAL = new StudentBAL();
        return reqBAL.UpdateRequest(datetime, userID);
    }


    [WebMethod]
    public string LoginUserUsingClass(string userid, string userpass)
    {

        LoginBAL loginBal = new LoginBAL();
        return loginBal.LoginUserUsingClass(userid, userpass);
    }
    [WebMethod]
    public string NextHazard()
    {
        DriverBAL driver = new DriverBAL();
        return driver.NextHazard();
    }
    [WebMethod]
    public string HazardReport(int userID, string date, string type, string description, string path)
    {
        DriverBAL driver = new DriverBAL();
        return driver.HazardReport(userID,date,type,description,path);
    }
    [WebMethod]
    public string  StartBreak(int userID, string date)
    {
        DriverBAL driver = new DriverBAL();
        return driver.StartBreak(userID, date);
    }
    [WebMethod]
    public string  EndtBreak(int userID, string date)
    {
        DriverBAL driver = new DriverBAL();
        return driver.EndtBreak(userID, date);
    }
    [WebMethod]
    public string  StartWorking(string date, string time, int userID)
    {
        DriverBAL driverBAL = new DriverBAL();
        return driverBAL.StartWorking(date, time, userID);
    }
    [WebMethod]
    public string EndtWorking(string date, string time, int userID)
    {
        DriverBAL driverBAL = new DriverBAL();
        return driverBAL.EndtWorking(date, time, userID); 
    }

    [WebMethod]
    public string LoadLocations()
    {
        StudentBAL load = new StudentBAL();
        return load.LoadLocations();
    }
    //[WebMethod]
    //public string GetRequests()
    //{
    //    DriverBAL loadreq = new DriverBAL();
    //    return loadreq.GetRequests();
    //}
    [WebMethod]
    public string GetAllUsers()
    {
        UsersBAL users = new UsersBAL();
        return users.GetAllUsers();
    }
    [WebMethod]
    public string LoadImmediateOrders()
    {
        DriverBAL loadim = new DriverBAL();
        return loadim.LoadImmediateOrders();
    }
    [WebMethod]
    public string LoadPreOrders(string todaydate)
    {
        DriverBAL loadPre = new DriverBAL();
        return loadPre.LoadPreOrders(todaydate);
    }
    [WebMethod]
    public string ChangeReqStatus(string datetime,int userID)
    {
        DriverBAL chng = new DriverBAL();
        return chng.ChangeReqStatus(datetime, userID);
    }
    [WebMethod]
    public string helloWorld()
    {
        return "hi";
    }

}


