myApp.controller('checkInOutController', ['$scope', '$location', '$http', 'VolunteerService', 'UserService',
                  function($scope, $location, $http, VolunteerService, UserService) {

  $scope.eventObject = UserService.eventObject;

  // when check in btn clicked, get for preregistered volunteers triggered and routes to volunteer view
  $scope.checkIn = function(){
    // VolunteerService.preregisteredVolunteer();
    $location.path('/volunteer');
  };
  // when check out btn clicked, route to confirmation view
  $scope.checkOut = function(){
    $location.path('/checkout');
  };
}]);
