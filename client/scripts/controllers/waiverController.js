myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  //BEGIN TIMER STUFF
  let inDate;

  $scope.waiverDefault = new Date();

  const NUM_MILIS_IN_HOUR = 3600000;
  $scope.setCheckIn = function() {
    inDate = new Date();
  };
  $scope.captureTime = function() {
    let newDate,
        inMonth,
        inDay,
        inYear,
        inHour,
        inMinute,
        prettyInDate,
        newMonth,
        newDay,
        newYear,
        newHour,
        newMinute,
        prettyNewDate,
        millisJustVolunteered,
        hoursJustVolunteered;

    console.log("inDate: ", inDate);
    inMonth = inDate.getMonth();
    inDay = inDate.getDate();
    inYear = inDate.getFullYear();
    inHour = inDate.getHours();
    inMinute = inDate.getMinutes();
    prettyInDate = inMonth + "/" + inDay + "/" + inYear +
      ", at " + inHour + ":" + inMinute;
    console.log("prettyInDate: ", prettyInDate);

    newDate = new Date();
    console.log("newDate: ", newDate);
    newMonth = newDate.getMonth();
    newDay = newDate.getDate();
    newYear = newDate.getFullYear();
    newHour = newDate.getHours();
    newMinute = newDate.getMinutes();
    prettyNewDate = newMonth + "/" + newDay + "/" + newYear +
      ", at " + newHour + ":" + newMinute;
    console.log("prettyNewDate: ", prettyNewDate);

    millisJustVolunteered = newDate - inDate;
    hoursJustVolunteered = millisJustVolunteered / NUM_MILIS_IN_HOUR;
    console.log("hoursJustVolunteered: ", hoursJustVolunteered);
  };
  //END TIMER STUFF

  $scope.adultWaiver = {};
  $scope.submitAdultWaiver = function(waiverObj) {
    console.log("Adult waiver object: ", waiverObj);

    let filledOut;

    filledOut = waiverObj.dateTop && waiverObj.nameTop && waiverObj.agreed &&
                waiverObj.nameBottom && waiverObj.dateBottom;

    if ( filledOut ) {
      $location.path("/waiver-photo");
    }
    else {
      alert("Please complete all fields");
    }
  };

  $scope.youthWaiver = {};
  $scope.submitYouthWaiver = function(waiverObj) {
    console.log("Youth waiver object: ", waiverObj);
    let noParentAll,
        parentAll,
        filledOut;

    noParentAll = waiverObj.noParent && waiverObj.nameBottom &&
                  waiverObj.dateBottomVol && waiverObj.guardianEmail;

    parentAll = waiverObj.dateTop && waiverObj.nameTop &&
                waiverObj.guardianTop && waiverObj.agreed &&
                waiverObj.nameBottom && waiverObj.dateBottomVol &&
                waiverObj.guardianBottom && waiverObj.dateBottomGuard;

    filledOut = noParentAll || parentAll;

    if ( filledOut ) {
      if ( noParentAll ) {
        $location.path("/override");
      }
      else if ( parentAll ) {
        $location.path("/waiver-photo");
      }
      else {
        alert("Weird error!");
      }
    }
    else {
      alert("Please complete all fields");
    }
  };

  $scope.photoWaiver = {};
  $scope.submitPhotoWaiver = function(waiverObj) {
    console.log("Photo waiver object: ", waiverObj);
    if ( waiverObj.agreed ) {
      $location.path("/confirmation");
    }
    else {
      $location.path("/override");
    }
  };

  $scope.declineWaiver = function() {
    $location.path("/override");
  };

}]);
