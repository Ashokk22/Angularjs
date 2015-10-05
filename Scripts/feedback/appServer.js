///<reference path='appSERVER.js' />
///<reference path='appDB.js' />
///<reference path='appUtility.js' />
///<reference path='/appCore/js/jquery.min.js' />

//ADD_SERVICE_URL = "http://techit-dev.dummy.com/adauthservice/adauthservice.asmx/";

//ADD_SERVICE_URL = "http://techit-tst.dummy.com/adauthservice/adauthservice.asmx/";

//ADD_SERVICE_URL = "http://techit.dummy.com/adauthservice/adauthservice.asmx/";

//ADD_SERVICE_URL = "https://mongateway.dummy.com/adauthservice/adauthservice.asmx/";

//ADD_SERVICE_URL = "https://mongateway-t.dummy.com/ADAuthentication/ADAuthService.asmx/";

ADD_SERVICE_URL = "http://techit-tst.dummy.com/breedingapi/api/adauthservice/adauthservice.asmx/";

//ADD_SERVICE_URL = "https://mongatewayint-t.dummy.com/adauthservice/adauthservice.asmx/";

//TOKEN_URL = "https://test.amp.dummy.com/as/token.oauth2"; //Test Token URL. 

//TOKEN_URL = "https://amp.dummy.com/as/token.oauth2?"; //Prod Token URl.

DATA_TYPE = "JSON";
CONTENT_TYPE = "application/JSON; charset=utf-8";

var appServer = {
    sSuccessCallback: "",
    sErrorCallback: "",
    sSERVER_URL: "",
    sMethodName: "",
    sJSONData: "",
    tokenObject: "",
    getSERVER: function (sMethodName, sJSONData, $http, sSuccessCallback, sErrorCallback) {

        this.sSuccessCallback = sSuccessCallback;
        this.sErrorCallback = sErrorCallback;
        this.sMethodName = sMethodName;
        this.sJSONData = getsUserJSON(sMethodName, sJSONData);
        this.sSERVER_URL = ADD_SERVICE_URL;
        this.actualDataCall();
    },
    actualDataCall: function ($http) {
        return $http({
            url: this.sSERVER_URL + this.sMethodName,
            data: JSON.stringify(this.sJSONData),
            contentType: CONTENT_TYPE,
            dataType: DATA_TYPE,
            method: 'POST',
        });
    }
};

var getsUserJSON = function (MethodName, sJSONData) {

    try {
        //        var sUserJSON = $.parseJSON(appUtility.getLocal("sUserInfo"));
        //        var sDomain = appUtility.getDomainName(sUserJSON["Domain"].split(".")[0]);
        var sUsageJSON =
                {
                    ID: null, //
                    UserID: sJSONData.sUserID, // Logged in userID //Remove hardcoded values
                    Domain: "", // Logged in user domain.
                    AppName: "SeedRequest", // Name of the application.
                    AppVersion: "1.0.0",
                    AppType: "Hybrid",
                    AppFeature: MethodName, //Requesting service Name.
                    AppService: APP_SERVICE_URL + MethodName,
                    AppDateTime: new Date().toDateString(),
                    AppDevice: null,
                    AppBrowser: navigator.userAgent,
                    AppCrash: null,
                    AppLat: null,
                    AppLon: null
                };
        sJSONData["sUsageJSON"] = JSON.stringify(sUsageJSON);
    } catch (e) {
        var sUsageJSON =
                {
                    ID: null, //
                    UserID: "anara", // Logged in userID //Remove hardcoded values
                    Domain: "", // Logged in user domain.
                    AppName: "SeedRequest", // Name of the application.
                    AppVersion: "1.0.0",
                    AppType: "Hybrid",
                    AppFeature: MethodName, //Requesting service Name.
                    AppService: ADD_SERVICE_URL + MethodName,
                    AppDateTime: new Date().toDateString(),
                    AppDevice: null,
                    AppBrowser: navigator.userAgent,
                    AppCrash: null,
                    AppLat: null,
                    AppLon: null
                };
        sJSONData["sUsageJSON"] = JSON.stringify(sUsageJSON);
    }
    return sJSONData;
};