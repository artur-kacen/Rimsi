'use strict';

// Declare app level module which depends on filters, and services

var front = angular.module('rimsi', ['ngCookies', 'ngRoute', 'ngSanitize', 'pascalprecht.translate',
    'rimsi.services', 'rimsi.controllers']);

front.config(function($routeProvider, $locationProvider, $httpProvider, $translateProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'views/frontend/index.html',
                controller: 'PageCtrl'
            })
            .when('/products', {
                templateUrl: 'views/frontend/products/all.html',
                controller: 'AllProductCtrl'
            })
            .when('/products/:id', {
                templateUrl: 'views/frontend/products/view.html',
                controller: 'ProductCtrl'
            })
            .when('/materials', {
                templateUrl: 'views/frontend/materials/all.html',
                controller: 'AllMaterialCtrl'
            })
            .when('/materials/:id', {
                templateUrl: 'views/frontend/materials/view.html',
                controller: 'MaterialCtrl'
            })
            .when('/news', {
                templateUrl: 'views/frontend/news/all.html',
                controller: 'AllNewsCtrl'
            })
            .when('/news/:id', {
                templateUrl: 'views/frontend/news/view.html',
                controller: 'NewsCtrl'
            })
            .when('/advices', {
                templateUrl: 'views/frontend/advices/all.html',
                controller: 'AllAdvicesCtrl'
            })
            .when('/advices/:id', {
                templateUrl: 'views/frontend/advices/view.html',
                controller: 'AdvicesCtrl'
            })

            .when('/about_us', {
                templateUrl: 'views/frontend/pages/view.html',
                controller: 'PageCtrl'
            })
            .when('/delivery', {
                templateUrl: 'views/frontend/pages/view.html',
                controller: 'PageCtrl'
            })
            .when('/call_measurer', {
                templateUrl: 'views/frontend/pages/view.html',
                controller: 'PageCtrl'
            })
            .when('/assembly', {
                templateUrl: 'views/frontend/pages/view.html',
                controller: 'PageCtrl'
            })
            .when('/spec_offers', {
                templateUrl: 'views/frontend/pages/view.html',
                controller: 'PageCtrl'
            })
            .when('/review', {
                templateUrl: 'views/frontend/pages/view.html',
                controller: 'PageCtrl'
            })
            .when('/contacts', {
                templateUrl: 'views/frontend/pages/view.html',
                controller: 'PageCtrl'
            })
            .otherwise({
                redirectTo: '/index'
            });
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("!");
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $translateProvider.translations('ru_RU', {
            'MAIN': 'Главная',
            'WORK_TIME': 'Время работы:',
            'PRODUCTS': 'Продукты',
            'MATERIALS': 'Материалы',
            'CONSTRUCTOR': 'Онлайн конструктор',
            'SPEC_OFFERS': 'Спец предложения',
            'GALLERY': 'Фотогалерея',
            'MEASURER': 'Вызов замерщика',
            'ASSEMBLY': 'Сборка',
            'DELIVERY': 'Доставка',
            'CLOSET': 'Шкафы купе',
            'KITCHEN': 'Кухни',
            'NEWS': 'Новости',
            'ADVICES': 'Советы специалистов',
            'SHOW_ALL': 'смотреть все',
            'DETAILED': 'подробнее'
        });
        $translateProvider.translations('lv_LV', {
            'MAIN': 'Sākums',
            'WORK_TIME': 'Darba laiks:',
            'PRODUCTS': 'Izstrādājumi',
            'MATERIALS': 'Materiāli',
            'CONSTRUCTOR': 'Online konstruktors',
            'SPEC_OFFERS': 'īpašie piedāvājumi',
            'GALLERY': 'Foto galerija',
            'MEASURER': 'Mērītāja izsaukums',
            'ASSEMBLY': 'Montāža',
            'DELIVERY': 'Piegāde',
            'CLOSET': 'Sienas skapji',
            'KITCHEN': 'Virtuves',
            'NEWS': 'Ziņas',
            'ADVICES': 'Speciālista ieteikumi',
            'SHOW_ALL': 'skatīt visu',
            'DETAILED': 'vairāk'
        });
        $translateProvider.uses('ru_RU');
        $translateProvider.preferredLanguage('ru_RU');
});

$(function () {
    $('#blueimp-gallery').data('useBootstrapModal', false);
    $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', true);
});