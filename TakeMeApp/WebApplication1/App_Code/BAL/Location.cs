using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.App_Code.BAL
{
    public class Location
    {
        public int LocationID { get; set; }
        public string LocationName { get; set; }
        public string Longi { get; set; }
        public string Lati { get; set; }
        public Location()
        {

        }
        public Location(int location, string locationName, string longi,string lati)
        {
            LocationID = location;
            LocationName = locationName;
            Longi = longi;
            Lati = lati;
        }

    }
}