app.factory('seedRequestService', function ($http, $window, $q, $localStorage) {
    return {

        getProgramCodes: function (userName) {

            //var $promise = $http.get(getHostURL() + 'GetProgramCodeByUser?userName=' + userName); //get all programmeCode
            //$promise.then(function (response) {
            //    //console.log(response);
            //    return response.data;
            //});
            //return $promise;

            var result = {
                data: [
                    { PROGRAMECODE: "A1", ISSELECTED: 'false', NOTIFY: 'false' },
                    { PROGRAMECODE: "A2", ISSELECTED: 'false', NOTIFY: 'false' },
                    { PROGRAMECODE: "A3", ISSELECTED: 'false', NOTIFY: 'false' },
                    { PROGRAMECODE: "A4", ISSELECTED: 'false', NOTIFY: 'false' },
                    { PROGRAMECODE: "A5", ISSELECTED: 'false', NOTIFY: 'false' }]
            };
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        },
        saveUserSetting: function (userName, programCode, groupByOption, firstSort, secondSort, tertiarySort, displayOptional1, displayOptional2, ipAddress, port) {

            //var $promise = $http.get(getHostURL() + "saveUserSettings?userName=" + userName + "&programCodes=" + programCode + "&GroupByOption=" + groupByOption + "&firstSort=" + firstSort + "&secondSort=" + secondSort + "&tertiarySort=" + tertiarySort + "&displayOptional1=" + displayOptional1 + "&displayOptional2=" + displayOptional2 + "&ipAddress=" + ipAddress + "&port=" + port + ""); //save user setting
            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;

            var result = {
                data: [
                    { userName: userName, programCode: programCode, GROUPBYOPTION: groupByOption, FIRSTSORTOPTION: firstSort, SECONDSORTOPTION: secondSort, TERTIARYSORTOPTION: tertiarySort, DISPLAYOPTION1: displayOptional1, DISPLAYOPTION2: displayOptional2, ipAddress: ipAddress, port: port }
                ]
            };
            $localStorage.userSettings = result;
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;

        },
        getUserSetting: function (userName) {

            //var $promise = $http.get(getHostURL() + "getUserSettings?userName=" + userName + ""); //save user setting
            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;
            var result = $localStorage.userSettings;

            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        },

        searchSeedRequest: function (programCode, sortBy) {

            var $promise = $http.get(getHostURL() + "searchSeedRequest?programCode=" + programCode + "&sortBy=" + sortBy + "");
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },


        searchInventory: function (firstSort, secondSort, thirdSort, displayOptional1, displayOptional2, programmeCode) {

            //var $promise = $http.get(getHostURL() + "searchSeedInventory?firstSort=" + firstSort + "&secondSort=" + secondSort + "&thirdSort=" + thirdSort + "&displayOptional1=" + displayOptional1 + "&displayOptional2=" + displayOptional2 + "&programmeCode=" + programmeCode + "");
            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;

            var result = {
                data: [
                    { PRIMARYDISPLAY: '@3457787666', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src445numre234', DISPLAYOPTIONAL2: '_554444555555', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787663', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr222numre234', DISPLAYOPTIONAL2: '_55441114', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr44445numre234', DISPLAYOPTIONAL2: '_5544444444', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src1111numre234', DISPLAYOPTIONAL2: '_55444334', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' }

                ]
            };
            $localStorage.inventoryData = result;
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;

        },

        searchSeedNotFound: function (firstSort, secondSort, thirdSort, displayOptional1, displayOptional2, programmeCode) {

            //var $promise = $http.get(getHostURL() + "searchSeedNotFound?firstSort=" + firstSort + "&secondSort=" + secondSort + "&thirdSort=" + thirdSort + "&displayOptional1=" + displayOptional1 + "&displayOptional2=" + displayOptional2 + "&programmeCode=" + programmeCode + "");
            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;
            var result = {
                data: [
                    { PRIMARYDISPLAY: '@3457787666', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src445numre234', DISPLAYOPTIONAL2: '_554444555555', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787663', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr222numre234', DISPLAYOPTIONAL2: '_55441114', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr44445numre234', DISPLAYOPTIONAL2: '_5544444444', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src1111numre234', DISPLAYOPTIONAL2: '_55444334', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' }

                ]
            };
            $localStorage.seedNotFoundData = result;
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        },


        GetSeedProcessingData: function (firstSort, secondSort, thirdSort, displayOptional1, displayOptional2, programCodes) {

            //var $promise = $http.get(getHostURL() + "getSeedProcessingData?firstSort=" + firstSort + "&secondSort=" + secondSort + "&thirdSort=" + thirdSort + "&displayOptional1=" + displayOptional1 + "&displayOptional2=" + displayOptional2 + "&programCodes=" + programCodes + "");

            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;
            var result = {
                data: [
                    { PRIMARYDISPLAY: '@3457787666', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src445numre234', DISPLAYOPTIONAL2: '_554444555555', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787663', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr222numre234', DISPLAYOPTIONAL2: '_55441114', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr44445numre234', DISPLAYOPTIONAL2: '_5544444444', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src1111numre234', DISPLAYOPTIONAL2: '_55444334', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' }

                ]
            };
            $localStorage.processingData = result;
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        },

        getPreSeedNotSheeledData: function (firstSort, secondSort, thirdSort, displayOptional1, displayOptional2, programCodes) {

            //var $promise = $http.get(getHostURL() + "getPreSeedNotSheeledData?firstSort=" + firstSort + "&secondSort=" + secondSort + "&thirdSort=" + thirdSort + "&displayOptional1=" + displayOptional1 + "&displayOptional2=" + displayOptional2 + "&programCodes=" + programCodes + "");

            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;

            var result = {
                data: [
                    { PRIMARYDISPLAY: '@3457787666', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src445numre234', DISPLAYOPTIONAL2: '_554444555555', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787663', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr222numre234', DISPLAYOPTIONAL2: '_55441114', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@sr44445numre234', DISPLAYOPTIONAL2: '_5544444444', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' },
                    { PRIMARYDISPLAY: '@3457787662', REQUIREDQUANTITY: 40, DISPLAYOPTIONAL1: '@src1111numre234', DISPLAYOPTIONAL2: '_55444334', ISSELECTED: 'false', DATE_NEEDED: '@3746589', PEDIGREE: '@3746589', REQUESTOR_PROG: '@3746589', SRC_PLOT_NUM: '@3746589', SRC_SET: '@3746589', ASORT1: '@3746589', ASORT2: '@3746589', ASORT3: '@3746589', ASORT4: '@3746589', OWNER: '@3746589', METHODOLOGY: '@3746589', ORIGIN: '@3746589', INBRED_LINE_RATING_CD: '@3746589', SRC_ORIG_COUNTRY: '@3746589', Request_ID: '@3746589', REQ_QTY: '@3746589', SOURCE: '@3746589', SRC_Season: '@3746589', STORAGE_UNIT_BARCODE: '@3746589', STORAGE_UNIT_DISPLAY_DNML: '@3746589', UOM: '@3746589' }

                ]
            };
            $localStorage.preSeedNotSheeledData = result;
            var deferred = $q.defer();
            deferred.resolve(result);
            return deferred.promise;
        },

        getPublisheddData: function (programCodes, fromDate, toDate) {

            var $promise = $http.get(getHostURL() + "getPublishedDataForFilteredDates?programCodes=" + programCodes + "&fromDate=" + fromDate + "&toDate=" + toDate + "");

            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        GetPendingRequests: function (sortBy) {

            var $promise = $http.get(getHostURL() + "GetPendingRequests?sortBy=" + sortBy + "");
            $promise.success(function (response) {
                return response.data;
            })
            .error(function (response) {
                console.log(response);
                toastr.error('Oops!There was an error for getting PendingRequests.Try again and if problem persists,contact Support.');
            });
            return $promise;
        },

        GetPendingRequestsCount: function () {

            var $promise = $http.get("http://localhost:52499/SRServices.asmx/GetPendingRequestsCount");
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },


        findAlterSource: function (requestId, programCodes) {

            var $promise = $http.get(getHostURL() + "getAlternateSourcesByOrigin?requestid=" + requestId + "&programCodes=" + programCodes);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        // Notifications are counted 

        getNotification: function (userId) {
            var $promise = $http.get(getHostURL() + "getAllNotificationbyID?userID=" + userId);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        getHistory: function (userId) {
            var $promise = $http.get(getHostURL() + "getAllHistorybyID?userID=" + userId);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        updateStatus: function (inventoryID, _StatusID) {

            //var $promise = $http.get(getHostURL() + "updateStatus?inventoryID=" + inventoryID + "&_StatusID=" + _StatusID + "");
            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;

            var deferred = $q.defer();
            deferred.resolve('successfully updated');
            return deferred.promise;
        },

        createShipping: function (fromProgramCode, toProgramCode, token) {

            var $promise = $http.get(getHostURL() + "CreateShippingRequest?fromProgramCode=" + fromProgramCode + "&toProgramCode=" + toProgramCode + "&token=" + token);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        createShippingContainer: function (shipmentId, token) {

            var $promise = $http.get(getHostURL() + "CreatePackingListContainer?id=" + "&token=" + token);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },
        moveToInActive: function (inventoryId, _Status, inActiveReason) {

            var $promise = $http.get(getHostURL() + "moveToInActive?inventoryID=" + inventoryId + "&_Status=" + _Status + "&inActiveReason=" + inActiveReason + "");
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        getNotificationEmails: function (REQUESTED_USERID, LoggedInUserEmail, programCode) {
            var $promise = $http.get(getHostURL() + "getNotificationstoEmail?REQUESTED_USERID=" + REQUESTED_USERID + "&LoggedInUserEmail=" + LoggedInUserEmail + "&programCode=" + programCode);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        seedNotShelled: function (origin, date, LoggedInUserEmail) {
            //var $promise = $http.get(getHostURL() + "sendEmailtoRequestor?origin=" + origin + "&date=" + date + "&LoggedInUserEmail=" + LoggedInUserEmail);
            //$promise.then(function (response) {
            //    return response.data;
            //});
            //return $promise;
            var deferred = $q.defer();
            deferred.resolve('successfully sent');
            return deferred.promise;
        },

        getWamToken: function (username, password) {


            var $promise = $http.get(getHostURL() + "GetWAMToken?sUserID=" + username + "&sPassword=" + password);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },
        seedPublish: function (senderInventoryBarcode, publishAllSeedQuantity, senderProgramCode, receivingProgramCode, seedQuantityUomName, comments, packagedBy, transferGermplasmOwnership, purpose, acceptPublishedInventory, token, userName, inventoryid, source, srcPlot, pedigree, ReqQty, MinQty, asort2, asort4, asort5, ipAddress, port, print) {

            var $promise = $http.get(getHostURL() + "SeedPublishing?senderInventoryBarcode=" + senderInventoryBarcode + "&publishAllSeedQuantity=" + publishAllSeedQuantity + "&senderProgramCode=" + senderProgramCode + "&receivingProgramCode=" + receivingProgramCode + "&seedQuantityUomName=" + seedQuantityUomName + "&comments=" + comments + "&packagedBy=" + packagedBy + "&transferGermplasmOwnership=" + transferGermplasmOwnership + "&purpose=" + purpose + "&acceptPublishedInventory=" + acceptPublishedInventory + "&token=" + token + "&username=" + userName + "&inventoryID=" + inventoryid + "&source=" + source + "&SRCPlot=" + srcPlot + "&pedigree=" + pedigree + "&seedReqQuantity=" + ReqQty + "&seedMinQuantity=" + MinQty + "&ASORT2=" + asort2 + "&ASORT4=" + asort4 + "&ASORT5=" + asort5 + "&ipAddress=" + ipAddress + "&port=" + port + "&print=" + print);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },
        seedDecrement: function (username, password) {
            var $promise = $http.post(getHostURL() + "GetWAMToken?sUserID=" + username + "&sPassword=" + password);
            $promise.then(function (response) {
                return response.data;
            });
            return $promise;
        },

        //createSeedRequest:function(RequestId,RequestorProg,RequestorUserId,Origin,Methodology,ReqQty,MinQty,UOM,PublishToProg,ShipToProg,DateNeeded,DateRequested)
        //{

        //    var reqData =
        //        {
        //            "RequestId": "",
        //            "RequestorProg": "08",
        //            "RequestorUserId": "KLNESS",
        //            "Origin": "GILU570/FOLU164",
        //            "Methodology": "DH",
        //            "ReqQty": 150,
        //            "MinQty": 120,
        //            "UOM": "Seed",
        //            "PublishToProg": "08",
        //            "ShipToProg": "08",
        //            "DateNeeded": "10-OCT-2015", "DateRequested": ""
        //        };

        //    var requestObj = {
        //        method: 'POST',
        //        url: 'http://localhost:52499/SRServices.asmx/CreateSeedRequest',
        //        headers: {
        //            'Content-Type': 'application/json'
        //        },
        //        data: { 'seedReq': reqData }

        //    };

        //    $http(requestObj).success(function (data) {
        //        var d = data;
        //    }).error(function (errordata) { //On error call back appropiate method in the client
        //        var err = e;
        //    })

        //   var $promise = $http.post(getHostURL() + "?CreateSeedRequest&RequestId=" + RequestId + "&RequestorProg=" + RequestorProg + "&RequestorUserId=" + RequestorUserId + "&Origin=" + Origin + "&ReqQty=" + ReqQty + "&MinQty=" + MinQty + "&UOM=" + UOM + "&PublishToProg=" + PublishToProg + "&ShipToProg=" + ShipToProg + "&DateNeeded=" + DateNeeded + "&DateRequested=" + DateRequested);
        //   $promise.then(function (response) {
        //       return response.data;
        //   });
        //   return $promise;
        //}

    }


    function getHostURL() {

        var host = $window.location.hostname;
        if (host == "localhost") {
            return "http://localhost:52499/SRServices.asmx/";
        }
        else {

            //switch url as per environment

            // Production
            //return "http://techit.dummy.com/SeedRequestService/SRServices.asmx/";

            // Testing
            //return "http://techit-tst.dummy.com/SeedRequestService/SRServices.asmx/";

            // Development
            return base_url;
        }


    }

});