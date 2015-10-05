app.controller('notificationController', function ($scope, seedRequestService) {
    //$scope.notificationCount;
    //$scope.allData;
    //$scope.PedigreeSortType = 'ASC';
    //$scope.SRC_Plot_NumberType = 'ASC';
    //$scope.SourceType = 'ASC';
    //$scope.DateStamp = 'ASC';


    ////service for getting the notification count
    //seedRequestService.getNotification().then(function (result) {
    //    $scope.notificationCount = result.data;
    //})


    //$scope.gridOptions = {
    //    data: 'allData',
    //    enableRowSelection: true,
    //    enablePaging: true,
    //    showFooter:true, 
    //    columnDefs: [
    //        { field: "Pedigree", displayName: "Pedigree", width: 200 },
    //        { field: "Total", displayName: "Total", width: 120 },
    //        { field: "SRC_Plot_Number", displayName: "SRC_Plot_Number", width: 220 },
    //        { field: "InvBid", displayName: "InvBid", width: 120 },
    //        { field: "Source", displayName: "Source", width: 350 },
    //        {field:"SeedAmount",displayName:"Seed Amount",width:120},
    //        { field: "DateStamp", displayName: "Requested Date", width: 150 }
    //    ]
    //};

    //// Search data on load. if you want to search on any button then you put this code in a function and call that function on ng-click
    ////$scope.searchSeed('Pedigree');
    //searchData('Pedigree');

    //$scope.searchSeed = function (sortBy) {

    //    searchData(sortBy);
    //};

    //function searchData(sortBy) {
    //    if (sortBy == 'Pedigree') {
    //        if ($scope.PedigreeSortType == 'ASC')
    //            $scope.PedigreeSortType = 'DESC';
    //        else
    //            $scope.PedigreeSortType = 'ASC';
    //        sortBy = sortBy + ' ' + $scope.PedigreeSortType;
    //    }
    //    if (sortBy == 'SRC_Plot_Number') {
    //        if ($scope.SRC_Plot_NumberType == 'ASC')
    //            $scope.SRC_Plot_NumberType = 'DESC';
    //        else
    //            $scope.SRC_Plot_NumberType = 'ASC';
    //        sortBy = sortBy + ' ' + $scope.SRC_Plot_NumberType;
    //    }
    //    if (sortBy == 'DateStamp') {
    //        if ($scope.DateStampType == 'ASC')
    //            $scope.DateStampType = 'DESC';
    //        else
    //            $scope.DateStampType = 'ASC';
    //        sortBy = sortBy + ' ' + $scope.DateStampType;
    //    }
    //    if (sortBy == 'Source') {
    //        if ($scope.SourceType == 'ASC')
    //            $scope.SourceType = 'DESC';
    //        else
    //            $scope.SourceType = 'ASC'; 
    //        sortBy = sortBy + ' ' + $scope.SourceType;
    //    }


    //    var selectedProgramCode = localStorage.selectedProgramCode;
    //    seedRequestService.searchSeedRequest(selectedProgramCode, sortBy).then(function (result) {
    //        console.log(result);
    //        $scope.allData = result.data;
    //    });
    //};

});
