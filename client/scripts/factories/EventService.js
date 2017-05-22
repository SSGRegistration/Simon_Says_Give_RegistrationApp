myApp.factory('EventService', ['$http', function($http){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends event information to server
  postEvent = function(eventToPost) {
    console.log('Posting event ', eventToPost);
    $http.post('/newEvent/add', eventToPost).then(function(response) {
      console.log('Back from server after posting event', response);
      serverResponseObject.response = response;
    });
  };

  return {
    serverResponseObject : serverResponseObject,
    postEvent : postEvent

  };
}]);
