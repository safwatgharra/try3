using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using WebApplication1.App_Code.DAL;

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
        public string InsertRequest(string date, int locationID, int userID,int requestType)
        {
            studentdb.InsertReqDB(date, locationID, userID,requestType);
            return studentdb.RequestUser(userID);
        }
        public string UpdateRequest(string date, int locationID, int userID)
        {
            studentdb.RemoveReqDB(date, locationID, userID);
            return studentdb.RequestUser(userID);
        }
    }
}