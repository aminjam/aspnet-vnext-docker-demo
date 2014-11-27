(function() {
  'use strict';

  // Controller name is handy for logging
  var ID = 'todo.editCtrl';
  var injections = ['$scope', '$http', '$location', '$stateParams', '$state', 'common', 'utilities'];

  // Define the controller on the module.
  // Inject the dependencies.
  // Point to the controller definition function.

  function instance($scope, $http, $location, $stateParams, $state, common, utilities) {
    var log = common.log,
      endpoints = utilities.endpoints;

    $scope.save = function (item) {
        if (item.id) {
            endpoints('consumer.todoUpdate').then(function (api) {
                $http({
                    method: api.method,
                    url: api.url,
                    data: item
                }).success(function () {
                    log.success('Updated!');
                    $state.go('^.list');
                });
            });
        } else {
            endpoints('consumer.todoCreate').then(function (api) {
                $http({
                    method: api.method,
                    url: api.url,
                    data: item
                }).success(function () {
                    log.success('Created!');
                    $state.go('^.list');
                });
            });
        }
    };

    function activate() {

      //Add Functions for the set of promises
        var promises = [];
        if ($stateParams.id) {
            promises.push(
                endpoints('consumer.todoFind').
                then(function (api) {
                    var def = common.$q.defer();
                    $http({
                        method: api.method,
                        url: api.url.replace('{id}', $stateParams.id)
                    }).success(function (data) {
                        def.resolve(data);
                    }).error(function (err) {
                        def.reject(err);
                    });
                    return def.promise;
                })
               );
        }
      common.activate(promises, ID)
        .then(function (results) {
            console.log('results', results);
            $scope.item = results[0];
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
