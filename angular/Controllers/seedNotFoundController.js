(function () {

    app.controller('seedNotFoundController', function ($scope, $location, $localStorage, $window, seedRequestService,toaster) {

        $scope.searchInventoryData = null;
        $scope.strListSelectedRequest = "";
        $scope.lstSeedNotShelledData = [];
        $scope.GoBackEvent = goBack;

        $scope.GroupByOption = localStorage.GroupByOption;
        $scope.sort1 = localStorage.FirstSortOption;
        $scope.sort2 = localStorage.SecondSortOption;
        $scope.sort3 = localStorage.ThirdSortOption;
        $scope.Display1 = localStorage.DisplayOptionalFirst;
        $scope.Display2 = localStorage.DisplayOptionalSecond;

        function goBack() {
            $window.history.back();
        };


        getDataOnLoad();

        function getDataOnLoad() {


            seedRequestService.searchSeedNotFound(localStorage.FirstSortOption, localStorage.SecondSortOption, localStorage.ThirdSortOption, localStorage.DisplayOptionalFirst, localStorage.DisplayOptionalSecond, localStorage.selectedProgramCode).then(function (result) {
                console.log(result);
                $scope.searchSeedNotFoundData = result.data;
            });

        };

        $scope.showModalReason = function () {
            $scope.strListSelectedRequest = '';
            angular.forEach($scope.searchSeedNotFoundData, function (item) {
                if (item.ISSELECTED == true)// if match then move to next screen
                {
                    
                    $scope.strListSelectedRequest = $scope.strListSelectedRequest + item.INVENTORYID + ", ";

                    localStorage.requestID = item.REQUEST_ID;
                    localStorage.generation = item.GENERATION;
                    localStorage.invBID = item.INVBID;

                }
            });

            if ($scope.strListSelectedRequest == null || $scope.strListSelectedRequest == '') {
                toaster.warning('First select a request');
            }
            else {
                $scope.strListSelectedRequest = $scope.strListSelectedRequest.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                //jQuery.noConflict();
                console.log($('#reasonModal'));
                $('#reasonModal').modal('show');
            }

        }

        $scope.moveToInActive = function (reason) {

            
            //jQuery.noConflict();
            $('#reasonModal').modal('hide');

            //update the status
            seedRequestService.moveToInActive($scope.strListSelectedRequest, 1491, reason).then(function () {
                //For Alternate sources
                angular.forEach($scope.searchSeedNotFoundData, function (item) {
                        console.log(item);
                        if (item.ISSELECTED == true) {
                            //console.log(strSelectedOrigin)
                 
                            $localStorage.alternateSourceData = null;
                            //strSelectedOrigin = item.ORIGIN+":"+item.INVBID+":";
                            seedRequestService.findAlterSource(item.REQUEST_ID, localStorage.selectedProgramCode).then(function (result) {
                                console.log(result);
                                console.log(result.data);
                                //$scope.searchInventoryData = result.data;

                                if (Object.keys(result.data).length > 0 && result.data !== 'null') {
                                    $localStorage.alternateSourceData = result.data;


                                    console.log("alternateSourceData", result.data);
                                    $location.path('/alternateSource'); 
                                }
                                else {
                                    toaster.warning('No alternatives FOUND');
                                }
                            });
                        }
                    });

            });


        }


        $scope.seedNotShelled = function () {

            $scope.lstSeedNotShelledData = [];
            angular.forEach($scope.searchSeedNotFoundData, function (item) {
                
                if (item.ISSELECTED == true)// if match then move to next screen
                {

                    //item.ISSELECTED = false;
                    $scope.lstSeedNotShelledData.push(item);

                    $scope.strListSelectedRequest = $scope.strListSelectedRequest + item.INVENTORYID + ", ";
                    //$scope.lstSeedNotShelledData.push(item);
                    console.log(item);
                    //localStorage.selectedRequest = $scope.lstSeedNotShelledData;
                    //$localStorage.selectedRequest = $scope.searchInventoryData;

                }
            });

            $localStorage.selectedRequest = $scope.lstSeedNotShelledData;


            //angular.forEach($scope.searchInventoryData, function (item) {
            //    if (item.ISSELECTED == true)// if match then move to next screen
            //    {
            //        $scope.strListSelectedRequest = $scope.strListSelectedRequest + item.INVBID + ", ";

            //    }
            //});

            $scope.strListSelectedRequest = $scope.strListSelectedRequest.replace(/(^[,\s]+)|([,\s]+$)/g, '');

            if ($scope.lstSeedNotShelledData.length > 0) {
                //update the status

                seedRequestService.updateStatus($scope.strListSelectedRequest, 1492).then(function () {

                    $location.path('/seedNotShelled');
                });
            }
            else {
                toaster.warning('select any request');
            }


        }
    });

})();