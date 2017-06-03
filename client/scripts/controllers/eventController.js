myApp.controller('EventController', ['$scope','$mdDialog','UserService','UtilitesService','EventService',
                function($scope,$mdDialog,UserService,UtilitesService,EventService) {

  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = EventService.serverResponseObject;

  EventService.getEvents();

  // Modal window that confirms event deletion
  $scope.showConfirm = function(ev,ssgEvent) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure that you want to delete this event?')
          .textContent('')
          .ariaLabel('Delete event')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      EventService.deleteEvent(ssgEvent);
      }, function() {
    });
  };

  // Redirects to Event View
  $scope.viewEvent = function(ssgEvent) {
    EventService.serverResponseObject.currentEvent = ssgEvent;
    UserService.redirect('/viewEvent');
  };

  // calls factory function to check out all active volunteers for the event
  $scope.logoutVolunteers = function(eventObject) {
    var eventParams = {};
    eventParams.eventCode = eventObject.event_code;
    eventParams.time = eventObject.event_until_time;
    EventService.logoutVolunteersByEvent(eventParams);
  }

}]);
