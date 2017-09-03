using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Xml;

namespace WebApplication1.App_Code.DAL
{
    public class RequestDBService
    {
        string strCon;
        JavaScriptSerializer serializer = new JavaScriptSerializer();


        public RequestDBService()
        {
            strCon = DBGlobals.strCon;
        }

        public object JsonConvert { get; private set; }

        public string RequestUser(int UserID)
        {
            SqlConnection con = new SqlConnection(strCon);
            SqlDataAdapter adptr = new SqlDataAdapter(
                " SELECT * " +
                " FROM RequestTB WHERE UserID = '"+UserID+"' and UserPass = '2'", con);


            DataSet ds = new DataSet();
            adptr.Fill(ds, "Requests");
            DataTable dt = ds.Tables["Requests"];

            //needs the newtonsoft.json from nuget packages!
            string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
            return json;
        }
    }
}