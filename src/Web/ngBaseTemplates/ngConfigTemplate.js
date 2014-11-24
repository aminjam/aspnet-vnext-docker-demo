(function() {
  'use strict';

  var injections = ['$http'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance($http) {
  }

  injections.push(intance);
  angular.module('app').config(injections);
})();
