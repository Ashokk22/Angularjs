(function () {
     app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, feedbackData) {
         $scope.feedbackData = feedbackData;


         $scope.ok = function () {
             
            $modalInstance.close($scope.feedbackData);
        };

         $scope.cancel = function () {
             
            $modalInstance.dismiss('cancel');
        };

         $scope.clear = function () {
             
            $scope.feedbackData.FeedbackType = '';
            //$modalInstance.dismiss('cancel');
        };

         $scope.isActive = function (selectedType) {
             
            return $scope.feedbackData.FeedbackType == selectedType;
        };

         $scope.SetFeedBackType = function (selectedType) {
             
            $scope.feedbackData.FeedbackType = selectedType;

        };
    });
     app.controller('FeedbackModalCtrl', ['$scope', '$modal', 'FeedBack', function ($scope, $modal, FeedBack,toaster) {
         $scope.ShowFeedBack = function (size) {

            $scope.$emit('block_scanner', true);

                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'Views/app-feedback.html',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        feedbackData: function () {
                            return $scope.feedbackData;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    $scope.$emit('block_scanner', false);

                    FeedBack.Create(selectedItem.UserId, selectedItem.Email, selectedItem.Comment, selectedItem.FeedbackType).success(function (data) {

                        toaster.success({
                            title: "Feedback Sent",
                            body: "Successful!"
                        });
                        //alert({
                        //        title: "Feedback Sent",
                        //        body: "Successful!"
                        //    });
                    }).error(function (errordata) { //On error call back appropiate method in the client
                    });
                }, function () {//Modal dismissed
                    $scope.$emit('block_scanner', false);
                });
            };

        var uservalue = sessionStorage.userInfo;
        if (uservalue != undefined) {
            //var jsonData = JSON.parse(sessionStorage.userInfo);
            $scope.surName = localStorage.userName;
            //$scope.givenName = jsonData.Message.GivenName;
            //console.log(jsonData);
        }
        $scope.feedbackData = {
            'Comment': '',
            'FeedbackType': 'Question',
            //'LoggedInName': jsonData.Message.DisplayName,//AuthService.getSession().displayName,
            //'Email': jsonData.Message.EMailId,//AuthService.getSession().emailId,
            //'UserId': jsonData.Message.Username//AuthService.getSession().username
        };



    }]);
})();