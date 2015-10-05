app.config(function ($stateProvider, $urlRouterProvider) {

    var viewBase = 'Views/';

    $urlRouterProvider.otherwise('/seedRequest'); //default redirecting view

    $stateProvider

        //.state('login', {
        //    url: '/login',
        //    templateUrl: 'login.html',
        //    controller: 'loginController'
        //})


          // default template on home
        .state('default', {
            url: '/default',
            templateUrl: viewBase + 'home-default.html',
            data: {
                requireLogin: true
            }
        })

        // nested list with custom controller
        .state('settings', {
            url: '/settings',
            templateUrl: viewBase + 'settings.html',
            controller: 'settingsController',
            data: {
                requireLogin: true
            }
        })
        .state('notification', {
            url: '/notification',
            templateUrl: viewBase + 'notification.html',
            controller: 'notificationController',
            data: {
                requireLogin: true
            }
        })
      //.state('home.seedRequest', {
      //    url: '/seedRequest',
      //    templateUrl: viewBase + 'SeedRequest.html',
      //    controller: 'seedRequestController'
      //})
    .state('seedRequestFilter', {
        url: '/seedRequestFilter',
        templateUrl: viewBase + 'SeedRequestFilterOption.html',
        controller: 'seedRequestFilterCntrlr',
        data: {
            requireLogin: true
        }
    })
      .state('seedRequest', {
          url: '/seedRequest',
          templateUrl: viewBase + 'SeedRequest.html',
          controller: 'seedRequestController',
          data: {
              requireLogin: true
          }
      })
    .state('seedNotFound', {
        url: '/seedNotFound',
        templateUrl: viewBase + 'seedNotFound.html',
        controller: 'seedNotFoundController',
        data: {
            requireLogin: true
        }
    })
    .state('seedNotShelled', {
        url: '/seedNotShelled',
        templateUrl: viewBase + 'seedNotShelled.html',
        controller: 'seedNotShelledController',
        data: {
            requireLogin: true
        }
    })
    .state('seedProcessing', {
        url: '/seedProcessing',
        templateUrl: viewBase + 'seedProcessing.html',
        controller: 'seedProcessingController',
        data: {
            requireLogin: true
        }
    })
        .state('seedPublish', {
            url: '/seedPublish',
            templateUrl: viewBase + 'seedPublish.html',
            controller: 'seedPublishController',
            data: {
                requireLogin: true
            }
        })
          .state('seedShipping', {
              url: '/seedShipping',
              templateUrl: viewBase + 'seedShipping.html',
              controller: 'seedShippingController',
              data: {
                  requireLogin: true
              }
          })
      .state('alternateSource', {
          url: '/alternateSource',
          templateUrl: viewBase + 'alternateSource.html',
          controller: 'alternateSourceController',
          data: {
              requireLogin: true
          }
      })
});

app.run(function ($rootScope, $window) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;


        var rememberMe = localStorage.isRememberMe;
        console.log(rememberMe);
        //if (rememberMe != 'true') {
        //    localStorage.userName = null;
        //    localStorage.password = null;
        //    event.preventDefault();
        //    $window.location.href = "login.html";
        //}
        //else {
        var un = localStorage.getItem("userName");
        var pw = localStorage.getItem("password");

        //console.log(un);
        //console.log(pw);

        if (requireLogin && (un === null || pw === null || un == "" || pw == "" || typeof (un) === 'undefined' || typeof (pw) === 'undefined')) {
            event.preventDefault();
            $window.location.href = "login.html";
        }
        //}
    });

});