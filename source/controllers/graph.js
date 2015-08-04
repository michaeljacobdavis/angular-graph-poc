var d3 = require('d3');
// Declare dependencies
module.exports = function ($scope, dataService) {
  var parseDate = d3.time.format('%d-%b-%y').parse;
  $scope.data = [];

  var fetchData = function (){
    dataService.all()
      .then(function (data) {
        data.forEach(function (d) {
          d.date = parseDate(d.date);
          d.close = +d.close;
        });

        $scope.data = data;

      });
  };

  $scope.width = 960;
  $scope.height = 500;

  fetchData();
};

module.exports['$inject'] = ['$scope', 'DataService'];
