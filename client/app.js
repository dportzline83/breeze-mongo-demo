(function (angular, breeze) {
	window.breeze.config.initializeAdapterInstance("dataService", "mongo", true);
	
	var app = angular.module('app', ['ngLocale', 'ngRoute']);

	app.value('breeze', breeze);
	
	app.config([
  	'$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/',
      {
        templateUrl: 'people.html',
        controller: 'PeopleCtrl'
      });
	}]);

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
			  	console.log("saved changes")
			  })
			  .fail(function(error) {
			  	console.log(error);
			  });
		};

		$scope.add = function() {
			var newPerson = manager.createEntity("Person");
			$scope.people.push(newPerson);
		};

	}]);
})(angular, breeze);