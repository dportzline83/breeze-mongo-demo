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
})(angular, breeze);