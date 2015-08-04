var d3 = require('d3');
var internals = {};

module.exports = function ($parse, $compile) {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      width: '=width',
      height: '=height'
    },
    link: function (scope, element, attrs) {
      scope.$watch('data', function (newval, old) {
        // Test if we have data
        if (!scope.data.length) {
          var x = angular.element('<loading></loading>');
          element.append(x);
          return $compile(x)(scope);
        }

        element.empty();

        // NOTE: This can be cleaned up and doesn't reflect angular
        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        var width = scope.width - margin.left - margin.right;
        var height = scope.height - margin.top - margin.bottom;

        var x = d3.time.scale()
        .range([0, width]);

        var y = d3.scale.linear()
        .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

        var line = d3.svg.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.close); });

        var svg = d3.select(element[0]).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        x.domain(d3.extent(scope.data, function (d) { return d.date; }));
        y.domain(d3.extent(scope.data, function (d) { return d.close; }));

        svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

        svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)');

        svg.append('path')
        .datum(scope.data)
        .attr('class', 'line')
        .attr('d', line);
      });
    }
  };
};
