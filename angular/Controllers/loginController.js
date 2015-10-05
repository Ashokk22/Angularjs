(function () {

    angular.module('seedApp').controller('loginController', function ($scope, $location, $localStorage, $window, $filter, authServiceProvider,toaster) {

        $scope.Login = userLogin;
        var rememberMe = localStorage.isRememberMe;
        if (rememberMe == 'true') {

            var un = localStorage.remeberUserName;
            var pw = localStorage.remeberPassword;
            $scope.userName = "";
            $scope.password = "";
            $scope.rememberMe;
            if (un != null && typeof (un) != undefined && un !== "") {
                //var js = JSON.parse (loginInfo);
                $scope.userName = un;
                $scope.rememberMe = true;
            }
            if (pw != null && typeof (pw) != undefined) {
                //var js = JSON.parse (loginInfo);
                $scope.password = pw;
            }
        }


        $scope.loginAttempts = 0;


        
        function userLogin() {
            

            //$window.location.href = "Index.html";
            if ($scope.userName == undefined || $scope.userName == "") {
                //$scope.loginErrorMsg = "UserName cannot be empty";
                toaster.warning('UserName cannot be empty');
                return;
            }
            else if ($scope.password == undefined || $scope.password == "") {
                //$scope.loginErrorMsg = "Password cannot be empty";
                toaster.warning('Password cannot be empty');
                return;
            }
            else {
                //if ($scope.loginAttempts > 2) {
                //    $scope.loginErrorMsg = "Please check the username and password";

                //}
                //else {
                authServiceProvider.GetUserValidationResult($scope.userName, $scope.password).then(
                    function (response) {
                        if (response != undefined && response.status == "ERROR") {
                            //alert('Rejected auth'); 
                            $scope.loginErrorMsg = response.message;
                            $scope.loginAttempts = $scope.loginAttempts + 1;
                            if ($scope.loginAttempts > 2) {
                                $window.location.href = "login.html";

                            }

                            //after 1 minute it will reset the loginAttempt
                            //setTimeout(function () {
                            //    $scope.loginAttempts = 0;
                            //    $scope.$apply();
                            //}, 60000);

                        }
                        else if (response != undefined) {
                            //alert('Accepted auth');
                            userInfo = response;
                            sessionStorage["userInfo"] = JSON.stringify(response);
                            //console.log(response);
                            localStorage.userName = $scope.userName; // set username
                            localStorage.password = $scope.password; // set password

                            if ($scope.rememberMe) {
                                localStorage.isRememberMe = true;
                                //localStorage.remeberUserName = $scope.userName;
                                //localStorage.remeberPassword = $scope.password;
                            }
                            else {
                                localStorage.isRememberMe = false;
                                //localStorage.remeberUserName = "";
                                //localStorage.remeberPassword = "";
                            }

                            localStorage.remeberUserName = $scope.userName;
                            localStorage.remeberPassword = $scope.password;
                            $window.location.href = "Index.html";


                        }
                        else {
                            //$scope.loginErrorMsg = 'Invalid username or password';
                            toaster.warning('Invalid username or password');
                        }
                    },
                    function (err) {
                        //$scope.loginErrorMsg = "Service error, check network connectivity or contact admin";
                        toaster.warning('Service error, check network connectivity or contact admin');
                    }
                    )
               
            }
        }
        //$scope.chkBxChecked = function () {
        //    if ($scope.rememberMe) { //If it is checked
        //        //var loginInfo = {
        //        //    userName: $scope.userName, password: $scope.password
        //        //};
        //        localStorage.setItem("userName", $scope.userName);
        //        localStorage.setItem("password", $scope.password);
        //    }
        //} 
    });

})();