/**
 * Created by KACENAR1 on 13.8.12.
 */
var app = angular.module('rimsi.controllers', []);

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});
app.controller('MainCtrl', ['$scope', 'PagesFactory', '$translate', function($scope, PagesFactory, $translate){
    $scope.pages = PagesFactory.query();
    $scope.getPageTitle = function(ref) {
        var lang = $translate.uses();
        for (var i=0; i < $scope.pages.length; i++) {
            var page = $scope.pages[i];
            if (page.ref === ref && page.language === lang) {
                return page.name;
            }
        }
    }
}]);

app.controller('HomeCtrl', ['$scope', 'ProductsFactory', function($scope, ProductsFactory){
    $scope.products = ProductsFactory.query();
}]);

app.controller('ProductCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'ProductFactory',
function($scope, $routeParams, $translate, $timeout, ProductFactory) {
    $scope.product = ProductFactory.get({productId: $routeParams.id});
    $scope.i = 0;
    $scope.$watch(
        function() {return $translate.uses();},
        function(newValue) {
            if (newValue === 'ru_RU') {
                $scope.i=0;
            } else {
                $scope.i=1;
            }
        })
}]);

app.controller('PageCtrl', ['$scope', 'PageFactory', '$translate', '$location', function($scope, PageFactory, $translate, $location){
    $scope.page = PageFactory.query({ref: $location.path().replace("/", ""), language: $translate.uses()});
    $scope.$watch(
        function () {return $translate.uses();},
        function (newValue) {
            $scope.page = PageFactory.query({ref: $location.path().replace("/", ""), language: newValue});
        }
    )
}]);