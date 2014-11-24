'use strict';

describe('Controller: About.columnTwoCtrl', function () {
  var instance,scope;
  // load the controller's module
  beforeEach(module('app'));
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    instance = $controller('About.columnTwoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.scotches.length).toBe(3);
  });
  it('should have message ',function(){
    expect(scope.message).toBe('Hello');
  });
});
