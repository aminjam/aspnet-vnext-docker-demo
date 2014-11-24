(function() {
  'use strict';

  // Controller name is handy for logging
  var ID = 'todo.createCtrl';
  var injections = ['$scope', '$http', '$location', 'common', 'utilities'];

  // Define the controller on the module.
  // Inject the dependencies.
  // Point to the controller definition function.

  function instance($scope, $http, $location, common, utilities) {
    var log = common.log,
      endpoints = utilities.endpoints;

    $scope.add = function (item) {
        endpoints('consumer.todoCreate').then(function (api) {
            $http({
                method: api.method,
                url: api.url,
                data: item
            }).success(function () {
                log.success('Created!');
            });
        });
    };

    function activate() {

      //Add Functions for the set of promises
      var promises = [];
      common.activate(promises, ID)
        .then(function() {
          log.success('Activated ' + ID);
        });
    }
    activate();

    //#region Exposed Methods

    //#endregion

    //#region Internal Methods

    //#endregion
  }
  injections.push(instance);
  angular.module('app').controller(ID, injections);
})();
