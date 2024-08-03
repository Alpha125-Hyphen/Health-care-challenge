angular.module('healthApp', [])
.controller('MainController', function($scope) {
    $scope.newWorkout = {
        username: '',
        workoutType: '',
        minutes: ''
    };

    $scope.users = [
        { name: 'John Doe', workouts: ['Running', 'Cycling'], numberOfWorkouts: 2, totalMinutes: 75 },
        { name: 'Jane Smith', workouts: ['Swimming', 'Running'], numberOfWorkouts: 2, totalMinutes: 80 },
        { name: 'Mike Johnson', workouts: ['Yoga', 'Cycling'], numberOfWorkouts: 2, totalMinutes: 90 }
    ];

    $scope.addWorkout = function() {
        let user = $scope.users.find(u => u.name === $scope.newWorkout.username);
        if (user) {
            user.workouts.push($scope.newWorkout.workoutType);
            user.numberOfWorkouts += 1;
            user.totalMinutes += parseInt($scope.newWorkout.minutes);
        } else {
            $scope.users.push({
                name: $scope.newWorkout.username,
                workouts: [$scope.newWorkout.workoutType],
                numberOfWorkouts: 1,
                totalMinutes: parseInt($scope.newWorkout.minutes)
            });
        }
        $scope.newWorkout = {
            username: '',
            workoutType: '',
            minutes: ''
        };
    };

    $scope.filterByWorkoutType = function(user) {
        if (!$scope.filterWorkoutType) {
            return true;
        }
        return user.workouts.includes($scope.filterWorkoutType);
    };

    // Chart.js initialization (optional feature)
    $scope.$on('ngRepeatFinished', function() {
        $scope.users.forEach((user, index) => {
            let ctx = document.getElementById('chart-' + index).getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: user.workouts,
                    datasets: [{
                        label: 'Minutes',
                        data: user.workouts.map(w => user.totalMinutes / user.numberOfWorkouts), // Simplified for demo purposes
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    });
})
.directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});
