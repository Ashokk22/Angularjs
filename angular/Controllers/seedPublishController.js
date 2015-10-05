(function () {

    app.controller('seedPublishController', function ($scope,seedRequestService) {

        $scope.GoBackEvent = goBack;
        $scope.searchPublishedData = searchPublishedData;


        //get data on load
        searchPublishedData();

        function searchPublishedData()
        {
            var fromDate = $('#dpFromdate').val();
            var toDate = $('#dpTodate').val();
            
            seedRequestService.getPublisheddData(localStorage.selectedProgramCode, fromDate, toDate).then(function (result) {
                $scope.seedPublishData = result.data;

            });
        }

        function goBack() {
            $window.history.back();
        };

       // $scope.seedPublishData = [
       //{ firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com' },
       //{ firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com' },
       //{ firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com' }
       // ];
        //seedRequestService.getPublisheddData(localStorage.selectedProgramCode)
    })
})();