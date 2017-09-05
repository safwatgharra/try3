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
    }
}