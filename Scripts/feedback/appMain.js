/* 
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/


var appMain = {
    SendFeedback: function (username, email, comment, feedbacktype, $http) {

      
            var feedBackType = "";
       

            //            var sRequestJSON = {
            //                sUserID: appMain.getQueryString("sUserID"),
            //                sUsername: appMain.getQueryString("sUsername"),
            //                sEmailID: appMain.getQueryString("sEmailID"),
            //                sAppName: appMain.getQueryString("sAppName"),
            //                sComments: sComment,
            //                sFeedbackType: feedBackType
            //            };

            //            appServer.getSERVER('SendFeedback', sRequestJSON, function (sResponseJSON) {
            //                //Close modal.
            //                $("#Feedback").modal("hide");
            //            }, function (sErrorJSON) {
            //                debugger;
            //            });


            var sRequestJSON = {
                sUserID: username,//Remove hardcoded values
                sUsername: username,
                sEMailID: email,
                sAppName: "SeedRequest",
                sComments: comment,
                sFeedbackType: feedbacktype
            };

      
            appServer.getSERVER('SendFeedback', sRequestJSON,$http, function (sResponseJSON) {
                //Close modal.
                //appMain.showMessageDialog("Feedback sent successfully", function () {
                //    window.close();
                });

            }
};
