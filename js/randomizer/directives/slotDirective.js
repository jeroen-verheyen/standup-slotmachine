angular.module('randomizer').directive('slot', ['$timeout', function ($timeout) {
  function fireEvent(eventName) {
      var event; // The custom event that will be created

    if (document.createEvent) {
      event = document.createEvent("HTMLEvents");
      event.initEvent(eventName, true, true);
    } else {
      event = document.createEventObject();
      event.eventType = eventName;
    }

    event.eventName = eventName;

    if (document.createEvent) {
      document.body.dispatchEvent(event);
    } else {
      document.body.fireEvent("on" + event.eventType, event);
    }
  }

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
