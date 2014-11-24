(function() {
  'use strict';

  var commonApp = angular.module('common',[]);
  commonApp.provider('commonConfig', function() {
    this.config = {
      // These are the properties we need to set
      //controllerActivateSuccessEvent: '',
      //spinnerToggleEvent: '',
      //authChangedEvent: '',
      //levels:{log:'',toastr:''}
    };

    this.$get = function() {
      return {
        config: this.config
      };
    };
  });
})();
