/**
 * Created by KACENAR1 on 13.18.11.
 */
angular.module("rimsi").directive("language", ['$translate', function($translate) {
    return {
        restrict: 'E',
        scope: false,
        template: '<img src="/images/rus.png" ng-click="toggleLang(\'ru_RU\')" class="icon" ng-class="{\'lang-opacity\': lang!=\'ru_RU\'}">' +
            '<img src="/images/lv.png" ng-click="toggleLang(\'lv_LV\')" class="icon" ng-class="{\'lang-opacity\': lang!=\'lv_LV\'}">',
        link: function ($scope) {
            $scope.lang = $translate.uses();
            $scope.toggleLang = function (lang) {
                $scope.lang = lang;
                $translate.uses(lang);
            };
        }
    }
}]);

angular.module("rimsi").directive("mainMenu", ["$translate", "ProductsFactory",  function($translate, ProductsFactory ) {
    return {
        restrict: "E",
        scope: true,
        templateUrl: 'views/frontend/menu.html',
        link: function(scope) {
            scope.products = ProductsFactory.query();
            scope.i = 0;
            scope.$watch(
                function() {return $translate.uses();},
                function(newValue) {
                if (newValue === 'ru_RU') {
                    scope.i = 0;
                } else {
                    scope.i = 1;
                }
            })
        }
    }
}])