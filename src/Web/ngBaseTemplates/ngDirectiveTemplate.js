(function() {
  'use strict';

  // Factory name is handy for logging
  /* Naming Convention:
   * file-name should match the ID.
   * if it is Component specific: {{component}}.app{{Functionality}}.js (somewhat uncommon) e.g. (profile.appSomethingCool.js)
   * if it is common throughout the app, and it should be under bootstrap folder: app{{Functionality}}.js e.g. appTableResizer.js
   * if it is common in original template (theia), and it should be in theia project under bootstrap component: theia{{Functionality}}.js e.g. (theiaAlwaysUsefulFunctionality.js)
  */
  var ID = 'ngDirectiveTemplate';
  var injections = ['$window'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance($window) {
    // Define the functions and properties to reveal.

    function expose() {
      return {
        link: link,
        restrict: 'A'
      };
    }

    //#region Exposed Methods

    function link(scope,element,attrs) {

    }

    //#endregion

    //#region Internal Methods

    //#endregion
    return expose();
  }

  injections.push(instance);
  angular.module('app').directive(ID, injections);
})();
