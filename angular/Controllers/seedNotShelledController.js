(function () {

    app.controller('seedNotShelledController', function ($scope, $localStorage, $window, $location, seedRequestService,toaster) {

        $scope.GoBackEvent = goBack;

        function goBack() {
            $window.history.back();
        };


        //$scope.datetimepicker1 = function () {
        //    return datetimepicker();
        //}
        //$scope.SeedNotShelledData = $localStorage.selectedRequest;

        //$scope.scheduleDateTime;

        getDataOnLoad();


        function getDataOnLoad() {
            seedRequestService.getPreSeedNotSheeledData(localStorage.FirstSortOption, localStorage.SecondSortOption, localStorage.ThirdSortOption, localStorage.DisplayOptionalFirst, localStorage.DisplayOptionalSecond, localStorage.selectedProgramCode).then(function (result) {
                console.log("from db on load", result);

                if (result.data.length == 0) {
                    $location.path('/seedNotFound');
                }
                else {
                    $scope.SeedNotShelledData = result.data;
                }

            });

        };


        console.log($localStorage.selectedRequest);

        $scope.optionSelectionChange = function (param) {
            //alert(param);

            console.log($localStorage.selectedRequest);
            //localStorage.selectedRequest
        };

        $scope.setExpand = function (data) {
            
            var toggle = !data[0].COLLAPSED;
            angular.forEach(data, function (item) {
                item.COLLAPSED = toggle;

            });
            //console.log(data[0]);
            //console.log(data);
        };

        $scope.setClass = function (data) {
            if (!data[0].COLLAPSED)
                return "collapsed";
            else
                return "expanded";
        }

        $scope.checkUncheckAll = function (data) {
            console.log(data);
            //var toggle = !data[0].ISSELECTED;
            angular.forEach(data, function (item) {
                item.ISSELECTED = data[0].PARENT_SELECTOR;
            });
        };



        $scope.checkUncheckChild = function (data) {
            console.log(data);
            angular.forEach(data, function (item) {
                if (item.ISSELECTED == false) {
                    data[0].PARENT_SELECTOR = false;

                }
            });
        };

        //var jsonData = JSON.parse(sessionStorage.userInfo);
        //$scope.LoggedInUserEmail = jsonData.Message.EMailId;
        $scope.LoggedInUserEmail = 'info@dummy.com';



        $scope.sendEmailToRequestor = function () {
            var isOriginSelected = false;
            var strSelectedOrigin = "";

            angular.forEach($scope.SeedNotShelledData, function (item) {
                if (item.ISSELECTED == true) {
                    isOriginSelected = true;
                    strSelectedOrigin = strSelectedOrigin + item.ORIGIN + ':' + item.REQUESTOR_USERID + ':' + item.INVENTORYID + ',';
                }
            })

            //localStorage.selectedateTime = $scope.scheduleDateTime == undefined ? "" : $scope.scheduleDateTime;
            console.log(localStorage.selectedateTime);
            strSelectedOrigin = strSelectedOrigin.replace(/(^[,\s]+)|([,\s]+$)/g, '');
            console.log(strSelectedOrigin);

            $scope.selectedateTime = $('#datetimepicker').val();
            console.log($scope.selectedateTime);

            localStorage.selectedOrigin = strSelectedOrigin;
            seedRequestService.seedNotShelled(strSelectedOrigin, $scope.selectedateTime, $scope.LoggedInUserEmail).then(function (result) {
                //alert(result.data);
                toaster.warning(result);
                getDataOnLoad();

            }, function (error) {
                alert("An error happened -> " + error);
            });
        }
    })

})();



