(function() {
  'use strict';

  var ID = 'config';
  var events = {
    controllerActivateSuccess: 'controller.activateSuccess',
  };
  var levels = {
    log:4,
    toastr:4
  };

  var config = {
    events: events,
    levels:levels
  };

  angular.module('app').constant(ID,config);

})();
