module.exports = function ($parse, $interval) {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      var base = 'Loading';
      var count = 1;
      var update = $interval(function () {
        if (count === 4) {
          count = 1;
        }
        element.html('<h1>' + base + Array(count + 1).join('.') + '</h1>');
        count = count + 1;
      }, 300);

      element.on('$destroy', function () {
        $interval.cancel(update);
      });
    }
  };
};
