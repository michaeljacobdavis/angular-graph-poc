var angular = require('angular');

angular.module('folio', [])
  .directive('lineChart', require('./directives/line-chart'))
  .directive('loading', require('./directives/loading'))
  .controller('GraphController', require('./controllers/graph'))
  .factory('DataService', require('./services/data'));
