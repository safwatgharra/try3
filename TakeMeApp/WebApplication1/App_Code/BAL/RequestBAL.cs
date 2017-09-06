using WebApplication1.App_Code.DAL;

namespace WebApplication1.App_Code.BAL
{
    public class RequestBAL
    {
        RequestDBService requestdb = new RequestDBService();
        public RequestBAL()
        {
            
        }
        public string LoadReguests(int userID)
        {
            return requestdb.RequestUser(userID);
        }
        public string InsertRequest(string date, int locationID, int userID)
        {
            requestdb.InsertReqDB(date, locationID, userID);
            return requestdb.RequestUser(userID);
        }
        public string UpdateRequest(string date, int locationID, int userID)
        {
            requestdb.RemoveReqDB(date, locationID, userID);
            return requestdb.RequestUser(userID);
        }
    }
}