angular.module('randomizer')
    .controller('RandomizerCtrl', ['$scope', '$timeout', '$filter', function ($scope, $timeout, $filter) {
        var ctrl = this;

        this.teamMembers = [
            {
                name: 'Tom',
                selected: false
            },
            {
                name: 'Jeroen',
                selected: false
            },
            {
                name: 'Mike',
                selected: false
            },
            {
                name: 'Djoeni',
                selected: false
            },
            {
                name: 'Indra',
                selected: false
            },
            {
                name: 'Bo',
                selected: false
            },
            {
                name: 'Ellen',
                selected: false
            }
        ];
        ctrl.slotPool = [];

        this.init = function () {
            ctrl.createSlotPool();
        };

        this.randomize = function () {
            //ctrl.createSlotPool();
            this.selectRandomFacilitator();
        };

        this.createSlotPool = function () {
            var slotPool = [];
            ctrl.teamMembers.forEach(function (teamMember) {
                slotPool.push(teamMember.name);
            });

            ctrl.slotPool = slotPool;
        };

        this.selectRandomFacilitator = function () {
            var unselectedFacilitators = $filter('filter')(ctrl.teamMembers, {selected: false});

            if(unselectedFacilitators.length == 0) {
                resetFacilitators();
                unselectedFacilitators = ctrl.teamMembers;
            }

            var randomNumber = Math.floor(Math.random() * unselectedFacilitators.length);
            var teamMemberIndex = ctrl.teamMembers.indexOf(unselectedFacilitators[randomNumber]);
            var facilitator = ctrl.teamMembers[teamMemberIndex];
            facilitator.selected = true;
            console.table(ctrl.teamMembers);

            $scope.$broadcast('startSlots', teamMemberIndex);
        };

        function resetFacilitators() {
            ctrl.teamMembers.forEach(function(teamMember) {
                teamMember.selected = false;
            })
        }

        function getTeamMemberByName(teamMemberName) {
            for (var i = 0; i < ctrl.teamMembers.length; i++) {
                if (ctrl.teamMembers[i].name == teamMemberName) {
                    return ctrl.teamMembers[i];
                }
            }

            return null;
        }
    }]);
