myApp.controller('ExportController', ['$scope', '$http', '$location', 'UserService', 'UtilitiesService','CSVService',
            function($scope, $http, $location, UserService, UtilitiesService, CSVService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = CSVService.serverResponseObject;
  $scope.exportOption = '';
  $scope.datesEnabledValue = true;
  $scope.fromDate;
  $scope.toDate;
  var errorMessage = "";

  // prepares information (parameter dates) and calls function in factory
  $scope.exportInformation = function(option) {
    data = {
      fromDate : new Date(),
      toDate : new Date()
    };
    // checks if option selected was hours and prepares data object of parameters
    if ($scope.exportOption === 'hours'){
      data.fromDate = $scope.fromDate;
      data.toDate = $scope.toDate;
      if (validDates (data.fromDate, data.toDate)) {
        // calls function in factory that requests data from the server
        CSVService.requestHoursCSV(data);
      }
    } else {
      CSVService.requestVolunteerCSV();
    }
  };

  // validates the date selection
  function validDates(fromDate, toDate) {
    if (fromDate && toDate) {
      if(toDate < fromDate) {
        errorMessage = 'Invalid date Selection';
        UtilitiesService.showAlert(errorMessage);
        return false;
      } else {
        return true;
      }
    } else {
      errorMessage = 'Invalid date Selection';
      UtilitiesService.showAlert(errorMessage);
      return false;
    }
  };
  // enables/disables datepickers depending on option selected
  $scope.toggleEnableDates = function() {
    if ($scope.exportOption === 'hours'){
      if ($scope.datesEnabledValue) {
        $scope.datesEnabledValue = false;
      }
    } else {
      $scope.datesEnabledValue = true;
    }
  };
}]);
