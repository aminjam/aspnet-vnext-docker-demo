(function() {
  'use strict';

  // Factory name is handy for logging
  var ID = 'ngFactoryTemplate';
  var injections = ['$http'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance($http) {
    // Define the functions and properties to reveal.

    function expose() {
      return {
        getData: getData
      };
    }

    //#region Exposed Methods

    function getData() {

    }

    //#endregion

    //#region Internal Methods

    //#endregion
    return expose();
  }

  injections.push(instance);
  angular.module('app').factory(ID, injections);
})();
