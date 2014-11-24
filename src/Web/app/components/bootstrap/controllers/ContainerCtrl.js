(function() {
  'use strict';

  // Controller name is handy for logging
  var ID = 'ContainerCtrl';
  var injections = ['$scope', '$rootScope','common', 'config'];

  // Define the controller on the module.
  // Inject the dependencies.
  // Point to the controller definition function.

  function instance($scope,$rootScope,common,config) {
    var log = common.log;

    function activate() {

      //Add Functions for the set of promises
      var promises = [];
      common.activate(promises, ID)
        .then(function() {
          log.success('Activated ' + ID);
        });
    }
    activate();


    //#region Events
    $rootScope.$on(config.events.controllerActivateSuccess,
      function() {
      }
    );
    //#endregion

    //#region Exposed Methods

    //#endregion

    //#region Internal Methods

    //#endregion
  }
  injections.push(instance);
  angular.module('app').controller(ID, injections);
})();
