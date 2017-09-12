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
        public string WayPoint { get; set; }
        public Location()
        {

        }
        public Location(int location, string locationName, string wayPoint)
        {
            LocationID = location;
            LocationName = locationName;
            WayPoint = wayPoint;
        }

    }
}