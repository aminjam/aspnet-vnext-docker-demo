(function () {
    'use strict';

    // name is handy for logging
    var injections = ['$stateProvider', '$urlRouterProvider'];

    // Define the factory on the module.
    // Inject the dependencies.

    function instance($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/todo');

        $stateProvider
          // HOME STATES AND NESTED VIEWS ========================================
          .state('todo', {
              url: '/todo',
              templateUrl: 'components/todo/partials/view.html'
          })
          // nested list with custom controller
          .state('todo.list', {
              url: '/list',
              templateUrl: 'components/todo/partials/list.html',
              controller: 'todo.listCtrl'
          })
          .state('todo.create', {
              url: '/create',
              templateUrl: 'components/todo/partials/edit.html',
              controller: 'todo.editCtrl'
          })
          .state('todo.edit', {
              url: '/edit/{id}',
              templateUrl: 'components/todo/partials/edit.html',
              controller: 'todo.editCtrl'
          });

    }

    injections.push(instance);
    angular.module('app').config(injections);
})();