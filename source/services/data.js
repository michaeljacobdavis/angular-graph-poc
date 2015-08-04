// Declare dependencies
module.exports = function ($q) {

  return {
    all: function (){
      var deferred = $q.defer();
      var promise = deferred.promise;
      // HTTP Request goes here
      setTimeout(function () {
        deferred.resolve(require('../data-source'));
      }, 10000);

      return promise;
    }
  };
};

module.exports['$inject'] = ['$q'];
