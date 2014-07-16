(function(angular) {
	var app = angular.module('app');

	app.controller('PeopleCtrl', ['$scope', 'breeze', 'manager', function($scope, breeze, manager) {

		$scope.people = [];

		breeze.EntityQuery
			.from('Persons')
			//.where('name', 'startsWith', 'D')
			.using(manager)
			.execute()
			.then(function(data) {
				$scope.people = data.results;
				$scope.$digest();
			})
			.fail(function(error) {
			});

		$scope.save = function () {
		  manager
			  .saveChanges()
			  .then(function () {
			  	console.log("Changes saved")
			  })
			  .fail(function(error) {
			  	console.log(error);
			  });
		};

		$scope.add = function() {
			var newPerson = manager.createEntity("Person");
			$scope.people.push(newPerson);
		};

		$scope.delete = function(person) {
			var index = $scope.people.indexOf(person);

			if (!person) {
				console.log("could not delete undefined person");
				return;
			}
			person.entityAspect.setDeleted();
			console.log("marked '" + person.name + "'' as deleted")
			$scope.save();

			$scope.people.splice(index, 1);
		};
	}]);
})(angular);