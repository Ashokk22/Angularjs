angular.module('seedApp').factory('authServiceProvider', ['$http', '$q', function ($http, $q) {
    //var validateUser = function (userName, password) {
    //    var deferred = $q.defer();  //sUsername=string&sPassword=string&sDirectoryList=string&sAppName=string
    //    var path = "http://techit-tst.dummy.com/breedingapi/api/adauthservice/adauthservice.asmx/AuthenticateUser" + "?callback=JSON_CALLBACK&sUsername=" + userName + "&sPassword=" + password + "&sDirectoryList=&sAppName='ITToolbox'";
    //    $http.jsonp(path)
    //                   .success(
    //                   function (data, status, headers, config) {
    //                       if (typeof (data) != 'object' && data.indexOf("INVALID USER") > -1) {
    //                           //alert('Rejected auth');
    //                           deferred.resolve(data);
    //                       }
    //                       else {
    //                           //alert('Accepted auth');
    //                           console.log(data);
    //                           userInfo = data;
    //                           sessionStorage["userInfo"] = JSON.stringify(data);
    //                           // $cookieStore.put("dhdAuthCookie", data);
    //                           deferred.resolve(userInfo);
    //                           console.log("userInfo");
    //                           //// $location.path("/home");
    //                       }
    //                   }).error(function (data, status, headers, config) {
    //                       deferred.resolve(data);
    //                   });
    //    return deferred.promise;
    //};
    var profilePicture = function () {
        return "http://mysites.dummy.com/User%20Photos/Profile%20Pictures/NORTH_AMERICA_" + userInfo.username + "_LThumb.JPG";
    }

    return {
        //GetUserValidationResult: validateUser,
        GetUserValidationResult: function (userName, password) {
            //var path = "http://techit-dev.dummy.com/breedingapi/api/adauthservice/adauthservice.asmx/AuthenticateUser" + "?sUsageJSON=JSON_CALLBACK&sUsername=" + userName + "&sPassword=" + encodeURIComponent(password) + "&sAppName=SeedRequest";

            //var $promise = $http.get(path);
            //$promise.then(function (response) {
            //    //console.log(response);
            //    return response;
            //});
            //return $promise;
            var data = { username: userName, password: password, status: 'success', message: 'succcessfully validated' };
            var deferred = $q.defer();
            deferred.resolve(data);
            return deferred.promise;
        },
        profilePicture: profilePicture
    }

}]);