angular.module('randomizer')
  .controller('RandomizerCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    var ctrl = this;

    this.teamMembers = [
      {
        name: 'Tom',
        penalty: 1
      },
      {
        name: 'Jeroen',
        penalty: 1
      },
      {
        name: 'Mike',
        penalty: 1
      },
      {
        name: 'Djoeni',
        penalty: 1
      },
      {
        name: 'Indra',
        penalty: 1
      },
      {
        name: 'Bo',
        penalty: 1
      },
      {
        name: 'Ellen',
        penalty: 1
      }
    ];
    ctrl.standupFacilitator = '';
    ctrl.slotPool = [];

    this.init = function() {
        ctrl.createSlotPool();
    };

    this.randomize = function() { 
      //ctrl.createSlotPool();
      $scope.$broadcast('startSlots'); 
    };

    this.createSlotPool = function() {
      var slotPool = [];
      ctrl.teamMembers.forEach(function(teamMember) {
        for(var i = 0; i < teamMember.penalty; i++) {
          slotPool.push(teamMember.name);
        }
      });

      ctrl.slotPool = slotPool;
    }

    $scope.$watch(
      function(){ 
        return ctrl.standupFacilitator
      },
      function(newVal) {
        if (newVal != undefined) {
          increasePenalty()
          resetPenalty(newVal);
        }
      }
    );

    function increasePenalty() {
      ctrl.teamMembers.forEach(function(teamMember) {
        teamMember.penalty++;
      });
    }

    function resetPenalty(teamMemberName) {
      var teamMember = getTeamMemberByName(teamMemberName);
      if(teamMember == null) {
        return;
      }

      teamMember.penalty = 1;
    }

    function getTeamMemberByName(teamMemberName) {
      for(var i = 0; i < ctrl.teamMembers.length; i++) {
        if(ctrl.teamMembers[i].name == teamMemberName) {
          return ctrl.teamMembers[i];
        }
      }

      return null;
    }
  }]);
