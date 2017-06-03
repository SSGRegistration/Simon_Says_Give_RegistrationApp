myApp.controller('AdminController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

$scope.redirect = UserService.redirect;
}]);
