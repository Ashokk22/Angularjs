(function () {

    app.controller('seedProcessingController', function ($scope, $http, $location, $window, seedRequestService, $localStorage, $q, toaster) {

        $scope.seedProcessingData;
        $scope.GoBackEvent = goBack;
        $scope.GroupByOption = localStorage.GroupByOption;
        $scope.sort1 = localStorage.FirstSortOption;
        $scope.sort2 = localStorage.SecondSortOption;
        $scope.sort3 = localStorage.ThirdSortOption;
        $scope.Display1 = localStorage.DisplayOptionalFirst;
        $scope.Display2 = localStorage.DisplayOptionalSecond;
        $scope.UserName = localStorage.userName;
        $scope.Password = localStorage.password;
        $scope.givenName = localStorage.givenName;
        $scope.IpAddress = localStorage.ipAddress;
        $scope.port = localStorage.port;
        $scope.scannerStatus = 0;  // default style

        function goBack() {
            $window.history.back();
        };


        getDataOnLoad();


        function getDataOnLoad() {
            
            seedRequestService.GetSeedProcessingData(localStorage.FirstSortOption, localStorage.SecondSortOption, localStorage.ThirdSortOption, localStorage.DisplayOptionalFirst, localStorage.DisplayOptionalSecond, localStorage.selectedProgramCode).then(function (result) {
                console.log(result);
                $scope.seedProcessingData = result.data;

                if (result.data.length == 0) {
                    toaster.warning('No Requests to process');
                }
            });

        };


        //$scope.PublishAndPrint = function () {
        //    // configure API 
        //    seedRequestService.getWamToken(username, password).then(function (result) {
        //        console.log(result)
        //        $scope.token = result.data;
        //    })

        //    angular.foreach($scope.seedProcessingData, function (item) {
        //        if(item.ISSELECTED==true)
        //        {
        //            //$http.post("http://velocity-ps.dummy.com:80/material-exchange/inventory?senderInventoryBarcode=" + item.InvBid + "&publishAllSeedQuantity")
        //        }

        //    });

        //};

        $scope.NotEnoughSeed = function () {


            angular.forEach($scope.seedProcessingData, function (item) {
                console.log(item);
                if (item.ISSELECTED == true) {
                    $localStorage.alternateSourceData = null;

                    seedRequestService.moveToInActive(item.INVENTORYID, 1491, 'NotEnoughSeed').then(function () {

                        seedRequestService.findAlterSource(item.REQUESTID, localStorage.selectedProgramCode).then(function (result) {
                            console.log(result);
                            console.log(result.data);
                            if (Object.keys(result.data).length > 0 && result.data !== 'null') {
                                $localStorage.alternateSourceData = result.data;
                                $location.path('/alternateSource');
                            }
                            else {
                                // reload the data
                                toaster.warning('No alternatives FOUND');
                            }
                        })

                    })
                }

            })

        };

        $scope.continue = function () {
            //seedRequestService.createSeedRequest() 
            $location.path('/seedRequest');
        }

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
            console.log(newVal)
            if (newVal != undefined)
                updateStatus();

        });
        //function addPackingContents(){
        //    var item = {};

        //    return item;
        //}

        //function sendToVelocity(data) {
        //    {
        //        var model = {
        //            "description": "",
        //            "fromContactId": "",
        //            "toContactId": "",
        //            "shipToAttn": "",
        //            "weightUOM": "",
        //            "shipmentTypeId": 0,
        //            "shipmentType": "",
        //            "stagingContainer": {
        //                "packingListContents": [
        //                  {
        //                      "rep": 0,
        //                      "scanOrder": 0,
        //                      "barcode": "",
        //                      "weight": 0,
        //                      "weightUOM": "",
        //                      "seedCount": 0,
        //                      "sendVerificationDate": "timestamp",
        //                      "receiveVerificationDate": "timestamp",
        //                      "epc": "",
        //                      "id": 0
        //                  }
        //                ],
        //                "grossWeight": 0,
        //                "netWeight": 0,
        //                "uom": "",
        //                "id": 0,
        //                "barcode": "",
        //                "storageContainerId": 0,
        //                "name": ""
        //            },
        //            "packingListContainers": [
        //              {
        //                  "packingListContents": [
        //                    {
        //                        "rep": 0,
        //                        "scanOrder": 0,
        //                        "barcode": "",
        //                        "weight": 0,
        //                        "weightUOM": "",
        //                        "seedCount": 0,
        //                        "sendVerificationDate": "timestamp",
        //                        "receiveVerificationDate": "timestamp",
        //                        "epc": "",
        //                        "id": 0
        //                    }
        //                  ],
        //                  "grossWeight": 0,
        //                  "netWeight": 0,
        //                  "uom": "",
        //                  "id": 0,
        //                  "barcode": "",
        //                  "storageContainerId": 0,
        //                  "name": ""
        //              }
        //            ],
        //            "fromSapContactId": "",
        //            "soldToContactId": "",
        //            "international": false,
        //            "id": 0,
        //            "shipmentBarcode": ""
        //        }
        //    }

        function updateStatus() {
            var strlistselectedinbid = '';
            var ismatch = false;
            $scope.scannerStatus = 0;
            var selectedSeedRequest;
            
            var promises = {}; $scope.token = '';
            seedRequestService.getWamToken($scope.UserName, $scope.Password).then(function (result) {
                console.log(result.data);
                $scope.token = result.data;
                var fromProgram = '';
                var toProgram = '';

                
                angular.forEach($scope.seedProcessingData, function (item) {
                    if (item.INVBID == $scope.BarcodeValue.trim())// if match then move to next screen
                    {
                        ismatch = true;
                        strlistselectedinbid = strlistselectedinbid + item.INVENTORYID + ",";
                        item.ISSELECTED = true; // if true then it will highlight the selected list
                        selectedSeedRequest = item;
                        //selectedSeedRequest.REQQTY
                        if (selectedSeedRequest.METHODOLOGY != "DH") {
                            promises = seedRequestService.seedPublish(selectedSeedRequest.INVBID, false, selectedSeedRequest.OWNER, selectedSeedRequest.PUBLISHTOPROG, selectedSeedRequest.UOM, "Test", localStorage.givenName, false, "Seed Transfer", true, $scope.token, $scope.UserName, item.INVENTORYID, item.SOURCE, item.SRCPLOTNUM, item.PEDIGREE, selectedSeedRequest.REQQTY, selectedSeedRequest.MINQTY, selectedSeedRequest.ASORT2, selectedSeedRequest.ASORT4, selectedSeedRequest.ASORT5,localStorage.ipAddress,localStorage.port, true);
                        }
                        fromProgram = selectedSeedRequest.OWNER;
                        toProgram = selectedSeedRequest.PUBLISHTOPROG;
                    }
                    else {
                        item.ISSELECTED = false;
                        
                    }
                });

                seedRequestService.createShipping(fromProgram, toProgram, $scope.token).then(function (data) {
                    seedRequestService.createShippingContainer(data.data.id, $scope.token);
                    var win = window.open('http://velocity-ps.dummy.com/shipping/#details/' + data.data, '_blank');
                    win.focus();
                });

                strlistselectedinbid = strlistselectedinbid.replace(/(^[,\s]+)|([,\s]+$)/g, '');


                if (ismatch) {
                    $scope.scannerStatus = 1;
                    
                    if (Object.keys(promises).length > 0) {
                        $q.all(promises).then(function (publishResult) {
                           
                            console.log("publish Result", publishResult);
                            getDataOnLoad();
                            toaster.success('successfully published');
                        });
                    }
                    else {
                    

                        // if DH methodology
                        seedRequestService.updateStatus(strlistselectedinbid, 1496).then(function (result) {
                            console.log(result);
                            getDataOnLoad();
                            toaster.success('Hold for DH, printing will occur in Direct Print upon notification.');
                        });
                    }

                    //localstorage.strlistselectedinbid = $scope.barcodevalue;
                }
                else {
                    $scope.scannerStatus = 2;
                }

                

            });

            //strlistselectedinbid=strlistselectedinbid.replace(/(^[,\s]+)|([,\s]+$)/g, '');

            //this is not barcode value
            //$scope.barcodevalue = strlistselectedinbid.replace(/(^[,\s]+)|([,\s]+$)/g, '');

            //if (ismatch) {

            //    if(Object.keys(promisesDH).length>0)
            //    {
            //        // if DH methodology
            //        seedRequestService.updateStatus(strlistselectedinbid, 1496).then(function (result) {
            //            console.log(result);
            //        });
            //    }
            //    else
            //    {
            //        $q.all(promises).then(function (publishResult) {
            //            
            //            console.log(publishResult);
            //            alert('successfully published');
            //        });
            //    }

            //    localstorage.strlistselectedinbid = $scope.barcodevalue;





            //    //update the status of the matched invbid
            //    //seedrequestservice.updatestatus($scope.barcodevalue, 'published').then(function () {
            //    //    // only if invbid match then enable the seedprocessing button


            //    //    //$scope.isseedprocessingdisabled = false;
            //    //    //$window.location.reload();
            //    //    //delay 3 second for move to next screen
            //    //    settimeout(function () {
            //    //        //$location.path('/seedprocessing');
            //    //        getdataonload();
            //    //        $scope.$apply();
            //    //    }, 3000);
            //    //});

            //}

        }
    })
})();
