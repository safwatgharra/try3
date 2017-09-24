using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for User
/// </summary>
public class User
{
    public int UserID { get; set; }

    public string UserFName { get; set; }
    public string UserLName { get; set; }
    public string PhoneNumber { get; set; }
    public string UDID { get; set; }
    public string CurrentLong { get; set; }
    public string CurrentLat { get; set; }
    public char TypeCode { get; set; }
    public User(int UserID, string UserFName, string UserLName, string PhoneNumber, string UDID, string CurrentLong, string CurrentLat, char TypeCode)
    {
        this.UserID = UserID;
        this.UserFName = UserFName;
        this.UserLName = UserLName;
        this.PhoneNumber = PhoneNumber;
        this.UDID = UDID;
        this.CurrentLong = CurrentLong;
        this.CurrentLat = CurrentLat;
        this.TypeCode = TypeCode;

    }
}