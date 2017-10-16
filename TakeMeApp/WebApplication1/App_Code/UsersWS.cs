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
using PushSharp;
using PushSharp.Android;
//using PushSharp.Apple;
using PushSharp.Core;

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
    public string TakeMe(string datetime, int userID, string longi, string lati)
    {
        //push notifacation to all drivers that there is a new request
        StudentBAL req = new StudentBAL();
        return req.TakeMe(datetime, userID, longi, lati);
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
        
        //RunPushNotification();
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
    public string ChangeReqStatus(string datetime,int userID,int driverID)
    {
        //push notifacation to the user
        DriverBAL chng = new DriverBAL();
        return chng.ChangeReqStatus(datetime, userID,driverID);
    }
    [WebMethod]
    public string UpdateWayPoint(int userID, string lat, string longi)
    {
        DriverBAL update = new DriverBAL();
        return update.UpdateWayPoint(userID, lat, longi);
    }
    [WebMethod]
    public string LoadDriverWP(int UserID)
    {
        StudentBAL load = new StudentBAL();
        return load.LoadDriverWP(UserID);
    }
    [WebMethod]
    public string helloWorld()
    {
        return "hi";
    }
    [WebMethod]
    public string InsertRegIdFromUser(string regId,int userId)
    {
        StudentBAL send = new StudentBAL();
        return send.InsertRegIdFromUser(regId,userId);
    }
    [WebMethod]
    public string FinishRide(int driverID)
    {
        DriverBAL d = new DriverBAL();
        return d.FinishRide(driverID);
    }

    [WebMethod]
    public void RunPushNotification(string regID,string message)
    {
        //Create our push services broker
        var push = new PushBroker();

        //Wire up the events for all the services that the broker registers
        push.OnNotificationSent += NotificationSent;
        //push.OnChannelException += ChannelException;
        //push.OnServiceException += ServiceException;
        //push.OnNotificationFailed += NotificationFailed;
        //push.OnDeviceSubscriptionExpired += DeviceSubscriptionExpired;
        //push.OnDeviceSubscriptionChanged += DeviceSubscriptionChanged;
        //push.OnChannelCreated += ChannelCreated;
        //push.OnChannelDestroyed += ChannelDestroyed;


        //------------------------------------------------
        //IMPORTANT NOTE about Push Service Registrations
        //------------------------------------------------
        //Some of the methods in this sample such as 'RegisterAppleServices' depend on you referencing the correct
        //assemblies, and having the correct 'using PushSharp;' in your file since they are extension methods!!!

        // If you don't want to use the extension method helpers you can register a service like this:
        //push.RegisterService<WindowsPhoneToastNotification>(new WindowsPhonePushService());

        //If you register your services like this, you must register the service for each type of notification
        //you want it to handle.  In the case of WindowsPhone, there are several notification types!



        //-------------------------
        // APPLE NOTIFICATIONS
        //-------------------------
        //Configure and start Apple APNS
        // IMPORTANT: Make sure you use the right Push certificate.  Apple allows you to generate one for connecting to Sandbox,
        //   and one for connecting to Production.  You must use the right one, to match the provisioning profile you build your
        //   app with!

        //var appleCert = File.ReadAllBytes(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "../../../Resources/PushSharp.Apns.Sandbox.p12"));
        //var appleCert = File.ReadAllBytes(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "../../../Resources/iphone_dist.p12"));

        ////IMPORTANT: If you are using a Development provisioning Profile, you must use the Sandbox push notification server 
        ////  (so you would leave the first arg in the ctor of ApplePushChannelSettings as 'false')
        ////  If you are using an AdHoc or AppStore provisioning profile, you must use the Production push notification server
        ////  (so you would change the first arg in the ctor of ApplePushChannelSettings to 'true')

        ////push.RegisterAppleService(new ApplePushChannelSettings(appleCert, "CERTIFICATE PASSWORD HERE")); //Extension method
        //push.RegisterAppleService(new ApplePushChannelSettings(appleCert, "",true)); //Extension method

        ////Fluent construction of an iOS notification
        ////IMPORTANT: For iOS you MUST MUST MUST use your own DeviceToken here that gets generated within your iOS app itself when the Application Delegate
        ////  for registered for remote notifications is called, and the device token is passed back to you
        //push.QueueNotification(new AppleNotification()
        //                           .ForDeviceToken("")
        //                           .WithAlert("Hello World!")
        //                           .WithBadge(7)
        //                           .WithSound("sound.caf"));


        //---------------------------
        // ANDROID GCM NOTIFICATIONS 
        //---------------------------
        //Configure and start Android GCM
        //IMPORTANT: The API KEY comes from your Google APIs Console App, under the API Access section, 
        //  by choosing 'Create new Server key...'
        //  You must ensure the 'Google Cloud Messaging for Android' service is enabled in your APIs Console
        //push.RegisterGcmService(new GcmPushChannelSettings("YOUR Google API's Console API Access  API KEY for Server Apps HERE"));
        push.RegisterGcmService(new GcmPushChannelSettings("AAAAmLsiwKw:APA91bGaElWDPvYOw5F3Mv9MbGROUltZlqZ_MKOooTlPidAcrDFCbOiFlZtGb835MYZ_EOjhKD4_LBHxg71ZYnbRF5bsfeyS6o3YyGGGZez4dd-MRywHWtuQOfeGvS0XmDKvmMg_Erlu"));
        //Fluent construction of an Android GCM Notification
        //IMPORTANT: For Android you MUST use your own RegistrationId here that gets generated within your Android app itself!

        ////////////////////string message = "sivan";

        //push.QueueNotification(new GcmNotification().ForDeviceRegistrationId("APA91bFjDMStGxVADWRXrPNSTRfb4A3p__lAVf5VtU2nsyeTYuCbNDQ1lK8p0dYQLxNaMbr5FeVOQf9c5yJ_1KkYNndZntmRS-JYP4mM21RVW8FQZD96X5ShusgnX-Wajq9UKD6P5UCHQqhlsEl5toiJPgoj3A")
        push.QueueNotification(new GcmNotification().ForDeviceRegistrationId(regID)
                              .WithJson("{\"message\": \" " + message + " \", \"title\": \" my title\", \"msgcnt\": \"1\", \"alert\":\"Hello World!\",\"badge\":7,\"sound\":\"sound.caf\"}"));
        
        push.StopAllServices();

    }
    void NotificationSent(object sender, INotification notification)
    {
        //Console.WriteLine("Sent: " + sender + " -> " + notification);
    }
}


