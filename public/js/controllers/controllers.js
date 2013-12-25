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

function MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, single) {
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
    if (single) {
        return MultiPageFactory.get({ref: $routeParams.id, type: $location.path().split("/")[1], lang: $translate.uses()});
    } else {
        return MultiPageFactory.query({ref: $routeParams.id, type: $location.path().split("/")[1], lang: $translate.uses()});
    }
}
app.controller('ProductCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
    $scope.product = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, true);

}]);
app.controller('AllProductCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
    function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
        $scope.products = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, false);
    }]);

app.controller('MaterialCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
    function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
        $scope.material = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, true);
    }]);
app.controller('AllMaterialCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
    function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
        $scope.materials = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, false);
    }]);
app.controller('NewsCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
    function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
        $scope.article = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, true);
    }]);
app.controller('AllNewsCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
    function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
        $scope.articles = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, false);
    }]);
app.controller('AdvicesCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
    function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
        $scope.advice = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, true);
    }]);
app.controller('AllAdvicesCtrl', ['$scope', '$routeParams', '$translate', '$timeout', 'MultiPageFactory', '$location',
    function($scope, $routeParams, $translate, $timeout, MultiPageFactory, $location) {
        $scope.advices = MultiPageHandler($scope, MultiPageFactory, $routeParams, $location, $translate, false);
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

app.controller('MultiPageCtrl', ['$scope', 'PageFactory', '$translate', '$location', function($scope, PageFactory, $translate, $location){
    $scope.page = PageFactory.query({ref: $location.path().replace("/", ""), language: $translate.uses()});
    $scope.$watch(
        function () {return $translate.uses();},
        function (newValue) {
            $scope.page = PageFactory.query({ref: $location.path().replace("/", ""), language: newValue});
        }
    )
}]);