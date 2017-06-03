myApp.controller('AddAdminController', ['$scope', '$http', '$location', 'UserService', 'UtilitiesService',
                function($scope, $http, $location, UserService, UtilitiesService) {

  $scope.redirect = UserService.redirect;
  var message = '';
  $scope.adminUser = {
    username: '',
    password: '',
    email: '',
    role: 'ADMIN'
  };

  // Registers a new ADMIN user
  $scope.registerAdminUser = function() {
    if($scope.adminUser.username == '' || $scope.adminUser.password == '' || $scope.adminUser.email == '') {
      UtilitiesService.showAlert('Please enter all the required information.');
    } else {
      $http.post('/register', $scope.adminUser).then(function(response) {
        message = $scope.adminUser.username + ' has been added as an Admin User.';
        showAlert(message);
      },
      function(response) {
        message = "Error adding admin. Please make sure admin doesn’t already exist."
        showAlert(message);
      });
    }
  }
}]);
