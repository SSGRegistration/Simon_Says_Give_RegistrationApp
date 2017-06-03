myApp.controller('LoginController', ['$scope', '$http', '$location', '$routeParams', 'UserService', 'UtilitesService',
        function($scope, $http, $location, $routeParams, UserService, UtilitesService) {

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.event = {
    eventCode: ''
  };
  $scope.adminMessage = '';
  $scope.eventMessage = '';
  $scope.message = '';

  // Logins Admin user
  $scope.login = function() {
    if($scope.user.username == '' || $scope.user.password == '') {
      $scope.adminMessage = "Enter your username and password!";
    } else {
      $http.post('/', $scope.user).then(function(response) {
        if(response.data.username) {
          // location works with SPA (ng-route)
          if (response.data.role === 'ADMIN') {
            $location.path('/displayEvents');
          } else {
            $location.path('/checkInOut');
          }
        } else {
          $scope.adminMessage = "Invalid username and password combination.";
        }
      });
    }
  };

  // Starts event based on event code
  $scope.startEvent = function() {
    if($scope.event.eventCode == '') {
      $scope.eventMessage = "Enter an event code!";
    } else {
      $http.get('/ssgEvent/start/' + $scope.event.eventCode).then(function(response) {
        if(response.data.event_code) {
          UserService.eventObject.eventCode = response.data.event_code;
          UserService.eventObject.eventName = response.data.event_name;
          $location.path('/checkInOut');
        } else {
          $scope.eventMessage = "Invalid event code.";
        }
      });
    }
  };

  // sends request to get a link to reset the password
  $scope.sendResetPassword = function() {
  if($scope.user.username === '') {
    $scope.message = "Enter your username!";
  } else {
    $http.post('/user/forgotpassword', $scope.user).then(function(response) {
      if(response.data == 'Code sent successfully.') {
        UtilitesService.showAlert('A link to change the password was sent by email.');
      } else {
        UtilitesService.showAlert('There was an error sending the link to change the password.');
      }
    });
  }
};

// sends request to the server with updated password
$scope.updatePassword = function() {
  // Send our password reset request to the server
  // with our username, new password and code
  if($scope.user.username === '' || $scope.user.password === '') {
    $scope.message = "Enter your username and password!";
  } else {
    $scope.user.code = $routeParams.code;
    $http.put('/user/resetpassword', $scope.user).then(function(response) {
      if(response.data == 'Password updated successfully.') {
        UtilitesService.showAlert('Password updated successfully.');
        $location.path('/home');
      } else {
        UtilitesService.showAlert('There was an error updating the password');
      }
    });
  }
};
}]);
