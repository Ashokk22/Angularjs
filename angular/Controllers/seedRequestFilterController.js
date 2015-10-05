(function () {
    app.controller('seedRequestFilterCntrlr', function ($scope, $location, $window, seedRequestService,toaster) {

        $scope.GroupByOption;
        $scope.FirstSortOption;
        $scope.SecondSortOption;
        $scope.ThirdSortOption;
        $scope.FourthSortOption;

        $scope.DisplayOptionalFirst;
        $scope.DisplayOptionalSecond;

        $scope.errorMessage;

        $scope.GoBackEvent = goBack;

        $scope.disabled = {};

        function goBack() {
            $window.history.back();
        };


        // fill existing settings
        seedRequestService.getUserSetting(localStorage.userName).then(function (result) {
            if (result.data != undefined) {
                $scope.GroupByOption = result.data[0].GROUPBYOPTION;
                $scope.FirstSortOption = result.data[0].FIRSTSORTOPTION;
                $scope.SecondSortOption = result.data[0].SECONDSORTOPTION;
                $scope.ThirdSortOption = result.data[0].TERTIARYSORTOPTION;
                $scope.DisplayOptionalFirst = result.data[0].DISPLAYOPTION1;
                $scope.DisplayOptionalSecond = result.data[0].DISPLAYOPTION2;


                fillLocalStorage();
            }
        });

        $scope.saveFilter = function () {

            if ($scope.FirstSortOption == undefined && $scope.SecondSortOption == undefined && $scope.ThirdSortOption == undefined) {
                toaster.warning('Atleast select one sort order');
                return;
            }

            fillLocalStorage();


            var userName = localStorage.userName;

            console.log(localStorage.GroupByOption);

            var selectedProgramCode = localStorage.selectedProgramCode;

            seedRequestService.saveUserSetting(userName, selectedProgramCode, localStorage.GroupByOption, localStorage.FirstSortOption, localStorage.SecondSortOption, localStorage.ThirdSortOption, localStorage.DisplayOptionalFirst, localStorage.DisplayOptionalSecond).then(function (result) {

                $location.path('/seedRequest');
            });
        };

        function fillLocalStorage() {
            localStorage.GroupByOption = $scope.GroupByOption == undefined ? "" : $scope.GroupByOption;
            localStorage.FirstSortOption = $scope.FirstSortOption == undefined ? "" : $scope.FirstSortOption;
            localStorage.SecondSortOption = $scope.SecondSortOption == undefined ? "" : $scope.SecondSortOption;
            localStorage.ThirdSortOption = $scope.ThirdSortOption == undefined ? "" : $scope.ThirdSortOption;

            localStorage.DisplayOptionalFirst = $scope.DisplayOptionalFirst == undefined ? "" : $scope.DisplayOptionalFirst;
            localStorage.DisplayOptionalSecond = $scope.DisplayOptionalSecond == undefined ? "" : $scope.DisplayOptionalSecond;
        };
    });
})();