angular.module('ngSlides').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'slide.html',
        controller: 'NavigationController'
      }).
      when('/:number', {
        templateUrl: 'slide.html',
        controller: 'NavigationController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

angular.module('ngSlides').controller('NavigationController',
  function($scope, $routeParams) {
	var slideNumberInUrl = $location.path().slice(1);
    
	if (slideNumberInUrl)
	  $scope.currentSlide = slideNumberInUrl;

  }
);
