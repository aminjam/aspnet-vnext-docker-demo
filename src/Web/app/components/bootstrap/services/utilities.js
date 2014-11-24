(function() {
  'use strict';

  // Factory name is handy for logging
  var ID = 'utilities';
  var injections = ['$window','config','urlResolver','common'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance($window,config,urlResolver,common) {
    var Q = common.$q;
    // Define the functions and properties to reveal.

    function expose() {
      return {
        endpoints: endpoints
      };
    }

    //#region Exposed Methods

    //use-case: generateUrl('profile.signup',OPTIONAL:'myQuery=value',OPTIONAL:'data')
    function endpoints(endpoint,query,domain) {
      var def = Q.defer();
      var outDomain = '',outEndpoint='', path='';
      var failure = function(err){def.reject(err);};
      urlResolver.fetchUrls().then(function(data){
        path = $window._.union(['endpoints'],endpoint.split('.'));
        outEndpoint = $window._.reduce(path,function(result,entity){
          return result[entity] || data[result][entity] ;
        });
        if (domain) {
          path = $window._.union(['domains'],domain.split('.'));
          outDomain = $window._.reduce(path,function(result,entity){
            return result[entity] || data[result][entity] ;
          });
        }else{
          outDomain = data.domains[endpoint.split('.')[0]];
        }
        if (query && query.indexOf('?') !== 0) { query = '?' + query; }
        else {query = '';}

        var regEx =//$/;
        outEndpoint.url = outDomain.replace(regEx,'').replace('@@','') + outEndpoint.url + query;
        def.resolve(outEndpoint);
      },failure);
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
