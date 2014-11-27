(function() {
  'use strict';

  // Factory name is handy for logging
  var ID = 'common';
  var injections = ['$q', '$rootScope', '$timeout', 'commonConfig','logger'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance($q, $rootScope, $timeout, commonConfig,logger) {
    // Define the functions and properties to reveal.

    function expose() {
      return {
        // common angular dependencies
        $emit: $emit,
        $q: $q,
        $timeout: $timeout,
        // generic
        activate: activate,
        isNumber: isNumber,
        textContains: textContains,
        log: logger.log, // for accessibility
      };
    }

    //#region Exposed Methods

    function activate(promises, id) {
        return $q.all(promises).then(function (results) {
            var def = $q.defer();
        var data = {
          controllerId: id
        };
        $emit(commonConfig.config.controllerActivateSuccessEvent, data);
        def.resolve(results);
        return def.promise;
      });
    }

    function $emit() {
      return $rootScope.$emit.apply($rootScope, arguments);
    }

    function isNumber(val) {
      // negative or positive
      var pattern = /^[-]?\d+$/;
      return pattern.test(val);
    }

    function textContains(text, searchText) {
      return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
    }

    //#endregion

    //#region Internal Methods

    //#endregion

    return expose();
  }

  injections.push(instance);
  angular.module('common').factory(ID, injections);
})();
