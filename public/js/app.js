'use strict';

// Declare app level module which depends on filters, and services

var front = angular.module('rimsi', ['ngCookies', 'ngRoute', 'ngSanitize', 'pascalprecht.translate',
    'rimsi.services', 'rimsi.controllers']);

front.config(function($routeProvider, $locationProvider, $httpProvider, $translateProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/frontend/index.html',
                controller: 'HomeCtrl'
            })
            .when('/product/:id', {
                templateUrl: 'views/frontend/products/view.html',
                controller: 'ProductCtrl'
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
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("!");
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $translateProvider.translations('ru_RU', {
            'MAIN': 'Главная',
            'WORK_TIME': 'Время работы:',
            'REVIEWS': 'Pascal Precht',
            'ABOUT_US': 'View source on GitHub',
            'NEWS': ''
        });
        $translateProvider.translations('lv_LV', {
            'MAIN': 'Galvena',
            'WORK_TIME': 'Darba laiks',
            'REVIEWS': 'Pascal Precht',
            'ABOUT_US': 'View source on GitHub',
            'NEWS': ''
        });
        $translateProvider.uses('ru_RU');
        $translateProvider.preferredLanguage('ru_RU');
});

$(function () {
    $('#blueimp-gallery').data('useBootstrapModal', false);
    $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', true);
});