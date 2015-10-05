app.controller('homeController', function ($scope, $http, $location, $window, $localStorage, seedRequestService) {

    $scope.BarcodeValueUSB;
    $scope.logout = function () {
        // else simple clear the localstorage and redirect to logic page
        localStorage.userName = null;
        localStorage.password = null;
        localStorage.isRememerMe = null;
        $window.location.href = "login.html";
    }

    //$scope.username = function () {

    //    var username = localStorage.userName
    //    return username;
    //}

    $scope.userName = localStorage.getItem("userName");
    //$scope.profilePictureUrl = "http://mysites.dummy.com/User%20Photos/Profile%20Pictures/NORTH_AMERICA_" + $scope.userName + "_LThumb.JPG";

    var uservalue = sessionStorage.userInfo;
    if (uservalue != undefined) {
        //var jsonData = JSON.parse(sessionStorage.userInfo);
        $scope.surName = localStorage.userName;
        //$scope.givenName = jsonData.Message.GivenName;
        localStorage.givenName = $scope.givenName;

    }
    else {
        $window.location.href = "login.html";
    }

    $scope.isScannerBlocked = false;
    $scope.$on("block_scanner", function (event, blocked) {
        
        $scope.isScannerBlocked = blocked;
    });


    var chars = [], timer;

    $scope.triggerUSBScanner = function usbBarcodeScan(e) {
        if ($scope.isScannerBlocked)
            return;

        // Clear the timer here
        clearTimeout(timer);
        console.log(e.which + ":" + chars.join("|"));
        // You don't need the next statement if the
        // keycode does not match in the first place
        if (e.which < 48 && e.which > 57) return;
        chars.push(String.fromCharCode(e.which));
        // checking the length here
        // if length less than 10 do nothing
        if (chars.length < 10) return;

        // Assign the id to the timer
        // which will be cleared on next     press
        timer = setTimeout(function () {
            var barcode = chars.join("");
            console.log("Barcode Scanned: " + barcode);
            // assign value to some input (or do whatever you want)
            $scope.BarcodeValueUSB = barcode;

            chars = [];
            $scope.$apply();
            //updateStatus();
        }, 500);

        //$scope.userName = localStorage.getItem("userName");
        //var jsonData = JSON.parse(sessionStorage.userInfo);
        //$scope.surName = jsonData.SurName;
        //$scope.givenName = jsonData.GivenName;

        //$scope.profilePictureUrl = "http://mysites.dummy.com/User%20Photos/Profile%20Pictures/NORTH_AMERICA_" + jsonData.Username + "_LThumb.JPG";
    };
});