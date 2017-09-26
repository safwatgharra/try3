using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DBGlobals
/// </summary>
static public class DBGlobals
{

   static bool local = true ;
    static bool Ruppin = true;
    static public string strCon;


    static  DBGlobals()
    {
        if (local && !Ruppin)
        {
            strCon = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;
        }
        else if (local && Ruppin)
        {
            strCon = ConfigurationManager.ConnectionStrings["RuppinDBLocal"].ConnectionString;
        }
        else
        {
            strCon = ConfigurationManager.ConnectionStrings["RuppinDBLive"].ConnectionString;
        }
    }
}