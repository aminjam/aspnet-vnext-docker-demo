(function() {
  'use strict';

  // Factory name is handy for logging
  var ID = 'urlResolver';
  var injections = ['$http','$templateCache','common'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance($http,$templateCache,common) {
    // Define the functions and properties to reveal.
    var Q = common.$q;

    function expose() {
      return {
        fetchUrls: fetchUrls
      };
    }

    //#region Exposed Methods

    function fetchUrls() {
      var def = Q.defer();
      $http({method:'GET',url:'data/url.json',cache:$templateCache}).success(function(data){
          def.resolve(data);
        }).error(function(err){
          def.reject(err);
        });
      return def.promise;
    }

    //#endregion

    //#region Internal Methods

    //#endregion
    return expose();
  }

  injections.push(instance);
  angular.module('app').factory(ID, injections);
})();
