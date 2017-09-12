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
    public string LoadRequests(int userid)
    {
        StudentBAL reqBAL = new StudentBAL();
        return reqBAL.LoadReguests(userid);
    }
    [WebMethod]
    public string InsertRequest(string date, int locationID, int userID,int requestType)
    {
        StudentBAL reqBAL = new StudentBAL();
        return reqBAL.InsertRequest(date, locationID, userID, requestType);
    }
    [WebMethod]
    public string UpdateRequest(string date, int locationID, int userID)
    {
        StudentBAL reqBAL = new StudentBAL();
        return reqBAL.UpdateRequest(date, locationID, userID);
    }


    [WebMethod]
    public string LoginUserUsingClass(string userid, string userpass)
    {
        LoginBAL loginBal = new LoginBAL();
        return loginBal.LoginUserUsingClass(userid, userpass);
    }

    [WebMethod]
    public void StartBreak(int userID, string date)
    {
        DriverBAL driver = new DriverBAL();
        driver.StartBreak(userID, date);
    }
    [WebMethod]
    public void EndtBreak(int userID, string date)
    {
        DriverBAL driver = new DriverBAL();
        driver.EndtBreak(userID, date);
    }
    [WebMethod]
    public void StartWorking(string date, string time, int userID)
    {
        DriverBAL driverBAL = new DriverBAL();
        driverBAL.StartWorking(date, time, userID);
    }
    [WebMethod]
    public void EndtWorking(string date, string time, int userID)
    {
        DriverBAL driverBAL = new DriverBAL();
        driverBAL.EndtWorking(date, time, userID); 
    }

    [WebMethod]
    public string LoadLocations()
    {
        StudentBAL load = new StudentBAL();
        return load.LoadLocations();
    }
    [WebMethod]
    public string GetRequests()
    {
        DriverBAL loadreq = new DriverBAL();
        return loadreq.GetRequests();
    }
    [WebMethod]
    public string GetAllUsers()
    {
        UsersBAL users = new UsersBAL();
        return users.GetAllUsers();
    }

    [WebMethod]
    public string helloWorld()
    {
        return "hi";
    }

}


