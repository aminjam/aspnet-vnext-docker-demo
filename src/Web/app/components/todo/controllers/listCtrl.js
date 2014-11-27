(function() {
  'use strict';

  // Controller name is handy for logging
  /* Naming Convention:
   * {{component}}.{{Functionality}}Ctrl.js
   * file-name should match the ID.
   * e.g. for Profile component and Signup functionality it should be (profile.SignupCtrl) with the same file name.
   */
  var ID = 'todo.listCtrl';
  var injections = ['$scope', '$http', '$state', '$timeout', 'common', 'utilities'];

  // Define the controller on the module.
  // Inject the dependencies.
  // Point to the controller definition function.

  function instance($scope, $http, $state, $timeout, common, utilities) {
    var log = common.log, endpoints = utilities.endpoints;
    endpoints('consumer.todoFind').then(function (api) {
        $http({
            method: api.method,
            url: api.url.replace('{id}','')
        }).success(function (data) {
            $scope.todos = data;
      });
    });

    $scope.delete = function (item) {
        endpoints('consumer.todoDelete').then(function (api) {
            $http({
                method: api.method,
                url: api.url.replace('{id}', item.id)
            }).success(function () {
                log.success('Deleted ' + item.title);
                $scope.todos = $scope.todos.filter(function(i){
                  return i.id != item.id;
                });
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

    //keep $scope exposed method as a single line for readability
    //$scope.getData = getData;
  }
  injections.push(instance);
  angular.module('app').controller(ID, injections);
})();
