angular.module('OWMApp',['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
		.when('/cities/:city', {
			templateUrl : 'city.html',
			controller : 'CityCtrl',
			resolve : {
				city: function(owmCities, $route, $location) {
					var city = $route.current.params.city;
					if(owmCities.indexOf(city) == -1) { //return the number position where the city lies in the owmCities value array
						$location.path('/error');
						return;
						//city not found
					}
					return city;
				}
			}
		})
		.when('/error', {
			template:'<p>Error- Page Not Found</p>'
		})
		.otherwise('/error');
	}])
	.controller('HomeCtrl', function($scope){})
	.controller('CityCtrl', function($scope, city){
		city = city.replace('_', ' ');
		$scope.city = city;
	})
	.value('owmCities', ['New_York', 'Dallas', 'Chicago'])
	.run(function($rootScope, $location, $timeout){
		$rootScope.$on('$routeChangeError', function() {
			console.log("error");
			$location.path('/error');
		});
		$rootScope.$on('$routeChangeStart', function() {
			$rootScope.isLoading = true;
		});
		$rootScope.$on('$routeChangeSuccess', function() {
			$timeout(function() {
		        $rootScope.isLoading = false;
		     }, 1000);
		});
	});

	