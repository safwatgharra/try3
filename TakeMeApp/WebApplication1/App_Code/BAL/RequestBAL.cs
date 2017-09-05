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
        public void InsertRequest(string date, int locationID, int userID)
        {
            requestdb.InsertReqDB(date, locationID, userID);

        }
        public void UpdateRequest(string date, int locationID, int userID)
        {
            requestdb.RemoveReqDB(date, locationID, userID);
        }
    }
}