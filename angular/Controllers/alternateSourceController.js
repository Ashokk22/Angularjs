(function () {

    app.controller('alternateSourceController', function ($scope, $location, seedRequestService, $cordovaBarcodeScanner, $window, $localStorage) {

        $scope.scannerStatus = 0;  // default style

        // unblock the sacnner
        $scope.$emit('block_scanner', false);

        $scope.GoBackEvent = goBack;
        function goBack() {
            $window.history.back();
        };


        // data filled in seedNotFound page.
        $scope.alternateSourceData = $localStorage.alternateSourceData;

        console.log("load data", $localStorage.alternateSourceData);

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

        $scope.$watch('BarcodeValueUSB', function (newVal, oldVal) {
            console.log('changed');
            console.log(newVal);
            console.log(oldVal);
            $scope.BarcodeValue = newVal;
            if (newVal != undefined)
                updateStatus();

        });

        function updateStatus() {
            var strListSelectedInBid = '';
            var isMatch = false;
            $scope.scannerStatus = 0;
            //angular.forEach($scope.alternateSourceData, function (item) {
            if ($scope.alternateSourceData.InvBid == $scope.BarcodeValue.trim())// if match then move to next screen
            {
                isMatch = true;
                strListSelectedInBid = $scope.alternateSourceData.InventoryId;
                $scope.alternateSourceData.ISSELECTED = true; // if true then it will highlight the selected list
                
            }
            else {
                $scope.alternateSourceData.ISSELECTED = false;
                
            }
            //});

            //$scope.BarcodeValue = strListSelectedInBid.replace(/(^[,\s]+)|([,\s]+$)/g, '');

            if (isMatch) {
                $scope.scannerStatus = 1;
                localStorage.strListSelectedInBid = $scope.BarcodeValue;

                //update the status of the matched INVBID
                seedRequestService.updateStatus(strListSelectedInBid, 1489).then(function () {
                    // only if INVBID match then enable the SeedProcessing Button
                    $window.history.back();
                });

            }
            else
            {
                $scope.scannerStatus = 2;
            }
        };

    })

})();