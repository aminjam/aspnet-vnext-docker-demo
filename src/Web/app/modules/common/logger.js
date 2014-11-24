(function() {
  'use strict';

  // Factory name is handy for logging
  var ID = 'logger';
  var injections = ['$log', '$window','commonConfig'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance($log,$window,commonConfig) {
    // Define the functions and properties to reveal.

    function expose() {
      return {
        log: {
          info:info,
          error:error,
          success:success,
          warn:warn
        }
      };
    }

    //#region Exposed Methods

    function info(message, data, source,always) {
      logIt(message,data,source,'',always || false);
    }

    function error(message, data, source,always) {
      logIt(message,data,source,'error',always || false);
    }

    function success(message, data, source,always) {
      logIt(message,data,source,'success',always || false);
    }

    function warn(message, data, source,always) {
      logIt(message,data,source,'warning',always || false);
    }

    //#endregion

    //#region Internal Methods

    function logIt(message, data, source, type, always){
      var write = (type === 'error') ? $log.error : $log.log;
      source = source ? '[' + source + '] ' : '';
      always = (always === true);
      if (type === 'error') {
        if (commonConfig.config.levels.log >= 1 || always) {
          write(source, message, data);
        }
        if (commonConfig.config.levels.toastr >= 1 || always) {
          $window.toastr.error(message);
        }
      } else if (type === 'warning') {
        if (commonConfig.config.levels.log >= 2 || always) {
          write(source, message, data);
        }
        if (commonConfig.config.levels.toastr >= 2 || always) {
          $window.toastr.warning(message);
        }
      } else if (type === 'success') {
        if (commonConfig.config.levels.log >= 3 || always) {
          write(source, message, data);
        }
        if (commonConfig.config.levels.toastr >= 3 || always) {
          $window.toastr.success(message);
        }
      } else {
        if (commonConfig.config.levels.log >= 4 || always) {
          write(source, message, data);
        }
        if (commonConfig.config.levels.toastr >= 4 || always) {
          $window.toastr.info(message);
        }
      }
    }

    //#endregion
    return expose();
  }

  injections.push(instance);
  angular.module('common').factory(ID, injections);
})();
