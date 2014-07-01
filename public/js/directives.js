/**
 * Created by KACENAR1 on 13.18.11.
 */
angular.module("rimsi").directive("language", ['$translate', function($translate) {
    return {
        restrict: 'E',
        scope: false,
        template: '<img src="/images/rus.png" ng-click="toggleLang(\'ru_RU\')" class="icon" ng-class="{\'lang-opacity\': lang!=\'ru_RU\'}" alt="По Русски" title="По Русски">' +
            '<img src="/images/lv.png" ng-click="toggleLang(\'lv_LV\')" class="icon" ng-class="{\'lang-opacity\': lang!=\'lv_LV\'}" alt="Latviski" title="Latviski">',
        link: function ($scope) {
            $scope.lang = $translate.uses();
            $scope.toggleLang = function (lang) {
                $scope.lang = lang;
                $translate.uses(lang);
            };
        }
    }
}]);

angular.module("rimsi").directive("mainMenu", ["$translate", "MultiPageFactory", function($translate, MultiPageFactory) {
    return {
        restrict: "E",
        scope: {
            type: '@',
            getTitle: '='
        },
        templateUrl: 'views/frontend/menu.html',
        link: function(scope) {
            scope.products = MultiPageFactory.titles({type: "products"});
            scope.materials = MultiPageFactory.titles({type: "materials"});
            scope.i = 0;
            scope.$watch(
                function() {return $translate.uses();},
                function(newValue) {
                    var i;
                    if (newValue === 'ru_RU') {
                        i = 0;
                    } else {
                        i = 1;
                    }
                    if (scope.i !== i) {
                        replaceMobileMenu();
                        scope.i = i;
                    }

            });
            initRmm();
        }
    }
}]);
angular.module("rimsi").directive('activeLink', function($location) {

    var link = function(scope, element, attrs) {
        scope.$watch(function() { return $location.path(); },
            function(path) {
                var url = element.find('a').attr('href');
                if (url) {
                    url = url.substring(2);
                }

                if (path == url || path.substring(0, url.length) === url) {
                    element.addClass("active");
                } else {
                    element.removeClass('active');
                }

            });
    };

    return {
        restrict: 'A',
        link: link
    };
});

angular.module("rimsi").directive("moduleContent", ["$translate", "MultiPageFactory", function($translate, MultiPageFactory) {
    return {
        restrict: "E",
        scope: {
            type: "@"
        },
        templateUrl: "views/frontend/module-content.html",
        link: function(scope) {
            scope.items = MultiPageFactory.description({type: scope.type, count: 3});
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