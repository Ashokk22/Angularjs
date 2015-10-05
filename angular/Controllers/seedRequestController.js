(function () {

    app.controller('seedRequestController', function ($scope, $location, $localStorage, $window, seedRequestService,toaster) {

        //$scope.isSeedProcessingDisabled = true;

        //$scope.GroupByOption = localStorage.GroupByOption;
        $scope.sort1 = localStorage.FirstSortOption;
        $scope.sort2 = localStorage.SecondSortOption;
        $scope.sort3 = localStorage.ThirdSortOption;
        $scope.sort4 = localStorage.FourthSortOption;
        $scope.Display1 = localStorage.DisplayOptionalFirst;
        $scope.Display2 = localStorage.DisplayOptionalSecond;
        //$scope.seedRequestData;
        $scope.sortBy = localStorage.sortBy;
        $scope.searchInventoryData;

        $scope.scannerStatus = 0;  // default style

        // unblock the sacnner
        $scope.$emit('block_scanner', false);

        // barcode 
        $scope.BarcodeValue;
        var chars = [], timer;

        //events
        //$scope.triggerUSBScanner = usbBarcodeScan;
        $scope.GoBackEvent = goBack;

        //console.log($scope.GroupByOption);

        getDataOnLoad();


        function goBack() {
            $window.history.back();
        };

        function getDataOnLoad() {

            // fill existing setings
            seedRequestService.getUserSetting(localStorage.userName).then(function (result) {
debugger
                if (result.data != undefined && result.data.length > 0) {
                    $scope.GroupByOption = localStorage.GroupByOption = result.data[0].GROUPBYOPTION;
                    localStorage.FirstSortOption = result.data[0].FIRSTSORTOPTION;
                    localStorage.SecondSortOption = result.data[0].SECONDSORTOPTION;
                    localStorage.ThirdSortOption = result.data[0].TERTIARYSORTOPTION;
                    localStorage.DisplayOptionalFirst = result.data[0].DISPLAYOPTION1;
                    localStorage.DisplayOptionalSecond = result.data[0].DISPLAYOPTION2;
                    localStorage.selectedProgramCode = result.data[0].SEL_PROG_CODE;


                    seedRequestService.searchInventory(localStorage.FirstSortOption, localStorage.SecondSortOption, localStorage.ThirdSortOption, localStorage.DisplayOptionalFirst, localStorage.DisplayOptionalSecond, localStorage.selectedProgramCode).then(function (result) {
                        console.log(result);
                        $scope.searchInventoryData = result.data;

                        if (result.data.length == 0) {
                         
                            toaster.warning('No Pending Requests');
                        }
                    });

                }
                else {
                    $location.path('/settings'); // if no setting saved then redirect to settings page
                }
            });



        };


        $scope.refreshRequest = function () {
            getDataOnLoad();
        };


        $scope.scanBarcode = function () {
            $cordovaBarcodeScanner.scan().then(function (imageData) {
                //alert(imageData.text);
                console.log("Barcode Format -> " + imageData.format);
                console.log("Cancelled -> " + imageData.cancelled);
                //imageData.text
                $scope.BarcodeValue = imageData.text;
                updateStatus();
            }, function (error) {
                console.log("An error happened -> " + error);
            });
        };

        $scope.DoneScanning = function () {
            $location.path('/seedNotFound');
        };

        //For Alternate sources

        $scope.FindAlternateSource = function () {
            var strSelectedOrigin = '';
            angular.forEach($scope.searchInventoryData, function (item) {
                console.log(item);
                if (item.ISSELECTED == true) {
                    console.log(strSelectedOrigin)

                    $localStorage.alternateSourceData = null;
                    //strSelectedOrigin = item.ORIGIN+":"+item.INVBID+":";
                    seedRequestService.findAlterSource(item.REQUEST_ID, localStorage.selectedProgramCode).then(function (result) {
                        
                        console.log(result);
                        console.log(result.data);
                        //$scope.searchInventoryData = result.data;

                        if (Object.keys(result.data).length > 0 && result.data!=='null') {
                            $localStorage.alternateSourceData = result.data;


                            console.log("alternateSourceData", result.data);
                            $location.path('/alternateSource'); // ITS MOVING TO NEXT PAGE IF DATA FOUND
                        }
                        else {
                            toaster.warning('No alternatives FOUND');
                        }
                    });
                }
            });



        };

        $scope.MoveToSeedProcessing = function () {

            $location.path('/seedProcessing');
        };

        $scope.$watch('BarcodeValueUSB', function (newVal, oldVal) {
            console.log('changed');
            console.log(newVal);
            console.log(oldVal);
            $scope.BarcodeValue = newVal;
            if (newVal != undefined)
                updateStatus();

        });


        function updateStatus() {
            var strListSelectedInvId = '';
            var isMatch = false;
            $scope.scannerStatus = 0;
            angular.forEach($scope.searchInventoryData, function (item) {
                console.log(item)
                if (item.INVBID == $scope.BarcodeValue.trim())// if match then move to next screen
                {
                    isMatch = true;
                    strListSelectedInvId = strListSelectedInvId + item.INVENTORYID + ",";
                    item.ISSELECTED = true; // if true then it will highlight the selected list
                    
                }
                else {
                    item.ISSELECTED = false;
                }
            });

            $scope.InvID = strListSelectedInvId.replace(/(^[,\s]+)|([,\s]+$)/g, '');

            if (isMatch) {
                $scope.scannerStatus = 1;
                localStorage.strListSelectedInvId = $scope.InvID;

                //update the status of the matched INVBID
                seedRequestService.updateStatus($scope.InvID, 1489).then(function () {
                    // only if INVBID match then enable the SeedProcessing Button

                    //$scope.isSeedProcessingDisabled = false;
                    //$window.location.reload();
                    //delay 3 second for move to next screen
                    setTimeout(function () {
                        //$location.path('/seedProcessing');
                        getDataOnLoad();
                        $scope.$apply();
                    }, 3000);
                });

            }
            else
            {
                $scope.scannerStatus = 2;
            }
        };

    })
})
();
