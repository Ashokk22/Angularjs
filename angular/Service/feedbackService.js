angular.module('seedApp').factory('FeedBack', ['$http', function ($http) {

    var ADD_SERVICE_URL = base_env_url + "breedingapi/api/adauthservice/adauthservice.asmx/";

    var feedBackService = {};
    feedBackService.Create = function (username, email, comment, feedback) {


        var sRequestJSON = {
            sUserID: username, //Remove hardcoded values
            sUsername: username,
            sEMailID: email,
            sAppName: "SeedExchange",
            sComments: comment,
            sFeedbackType: feedback
        };

        var sUsageJSON = {
            ID: null, //
            UserID: username, // Logged in userID //Remove hardcoded values
            Domain: "", // Logged in user domain.
            AppName: "SeedExchange", // Name of the application.
            AppVersion: "1.0.0",
            AppType: "Hybrid",
            AppFeature: 'SendFeedback', //Requesting service Name.
            AppService: ADD_SERVICE_URL + 'SendFeedback',
            AppDateTime: new Date().toDateString(),
            AppDevice: null,
            AppBrowser: navigator.userAgent,
            AppCrash: null,
            AppLat: null,
            AppLon: null
        };

        //return $http({
        //    method: 'POST',
        //    url: base_env_url + 'breedingapi/api/adauthservice/adauthservice.asmx/SendFeedback',
        //    headers: {
        //        'Content-type': 'application/json'
        //    },
        //    data: {
        //        'sUserID': username,
        //        "sUsageJSON": JSON.stringify(sUsageJSON),
        //        'sUsername': username,
        //        'sEMailID': email,
        //        'sAppName': 'SeedExchange',
        //        'sComments': comment,
        //        'sFeedbackType': feedback
        //    }
        //});
        var deferred = $q.defer();
        deferred.resolve("successfully created");
        return deferred.promise;
    };
    return feedBackService
}]);