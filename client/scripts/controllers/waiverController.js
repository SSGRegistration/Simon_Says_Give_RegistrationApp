myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  let todaysDate = new Date();

  $scope.waiverObj = {
    //Adult waiver
    dateTopAdult: todaysDate,
    nameTopAdult: "",
    agreedAdult: false,
    nameBottomAdult: "",
    dateBottomAdult: todaysDate,
    //Youth waiver
    dateTopYouth: todaysDate,
    nameTopYouth: "",
    agreedYouth: false,
    nameBottomYouth: "",
    dateBottomYouth: todaysDate,
    noParentYouth: "",
    dateBottomVolYouth: todaysDate,
    guardianEmailYouth: "",
    guardianTopYouth: "",
    guardianBottomYouth: "",
    dateBottomGuardYouth: todaysDate,
    //Photo waiver
    agreedPhoto: false,
    nameBottomPhoto: "",
    dateBottomPhoto: todaysDate,
    dateBottomVolPhoto: todaysDate,
    guardianBottomPhoto: "",
    dateBottomGuardPhoto: todaysDate
  };

  //BEGIN TIMER STUFF
  let inDate;

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

  $scope.submitAdultWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
    let filledOut;

    filledOut = $scope.waiverObj.dateTopAdult &&
                $scope.waiverObj.nameTopAdult &&
                $scope.waiverObj.agreedAdult &&
                $scope.waiverObj.nameBottomAdult &&
                $scope.waiverObj.dateBottomAdult;

    if ( filledOut ) {
      $location.path("/waiver-photo");
    }
    else {
      alert("Please complete all fields");
    }
  };

  $scope.submitYouthWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
    let noParentAll,
        parentAll,
        filledOut;

    noParentAll = $scope.waiverObj.noParentYouth &&
                  $scope.waiverObj.nameBottomYouth &&
                  $scope.waiverObj.dateBottomVolYouth &&
                  $scope.waiverObj.guardianEmailYouth;

    parentAll = $scope.waiverObj.dateTopYouth &&
                $scope.waiverObj.nameTopYouth &&
                $scope.waiverObj.guardianTopYouth &&
                $scope.waiverObj.agreedYouth &&
                $scope.waiverObj.nameBottomYouth &&
                $scope.waiverObj.dateBottomVolYouth &&
                $scope.waiverObj.guardianBottomYouth &&
                $scope.waiverObj.dateBottomGuardYouth;

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

  $scope.submitPhotoWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);

    if ( $scope.waiverObj.agreedPhoto ) {
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
