angular.module('randomizer').directive('slot', ['$timeout', function ($timeout) {
  return {
    templateUrl: '/views/slot.html',
    restrict: 'E',
    replace: true,
    scope: {
      toUpdate: '=',
      items: '=',
      delay: '='
    },
    link: function (scope, element, attrs) {
      scope.$on('startSlots', function () {
        var slotMachine = $(element).find('.slot').first().slotMachine({
          active: 0,
          delay: 500
        });

        $timeout(function () {
          slotMachine.shuffle(5, function () {
            scope.$apply(function () {
              scope.toUpdate = scope.items[slotMachine.active];
            });
          });
        }, scope.delay);
      });
    }
  };
}]);
