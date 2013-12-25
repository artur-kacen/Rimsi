'use strict';

// Declare app level module which depends on filters, and services

var back = angular.module('rimsi-be', ['ngCookies', 'ngRoute', 'pascalprecht.translate', 'rimsi-be.global',
    'rimsi-be.services', 'rimsi-be.controllers', 'textAngular', 'angularFileUpload']);

back.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/backend/index.html',
            controller: 'AdminMainCtrl'
        }).
        /*when('/products', {
            templateUrl: 'views/backend/products/index.html',
            controller: 'AdminProductMainCtrl'
        }).
        when('/products/add', {
            templateUrl: 'views/backend/products/add.html',
            controller: 'AdminProductCtrl'
        }).
        when('/products/edit/:id', {
            templateUrl: 'views/backend/products/add.html',
            controller: 'AdminProductCtrl'
        }).*/
        when('/products', {
            templateUrl: 'views/backend/multi_page/index.html',
            controller: 'ProductPageCtrl'
        }).
        when('/products/add', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'ProductPageModifyCtrl'
        }).
        when('/products/edit/:id', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'ProductPageModifyCtrl'
        }).

        when('/materials', {
            templateUrl: 'views/backend/multi_page/index.html',
            controller: 'MaterialPageCtrl'
        }).
        when('/materials/add', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'MaterialPageModifyCtrl'
        }).
        when('/materials/edit/:id', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'MaterialPageModifyCtrl'
        }).
        when('/news', {
            templateUrl: 'views/backend/multi_page/index.html',
            controller: 'NewsPageCtrl'
        }).
        when('/news/add', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'NewsPageModifyCtrl'
        }).
        when('/news/edit/:id', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'NewsPageModifyCtrl'
        }).
        when('/advices', {
            templateUrl: 'views/backend/multi_page/index.html',
            controller: 'AdvicePageCtrl'
        }).
        when('/advices/add', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'AdvicePageModifyCtrl'
        }).
        when('/advices/edit/:id', {
            templateUrl: 'views/backend/multi_page/add.html',
            controller: 'AdvicePageModifyCtrl'
        }).


        when('/contacts', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'ContactCtrl'
        }).
        when('/contacts/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'ContactCtrl'
        }).
        when('/contactss/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'ContactAddCtrl'
        }).
        when('/index', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'IndexCtrl'
        }).
        when('/index/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'IndexCtrl'
        }).
        when('/indexs/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'IndexAddCtrl'
        }).
        when('/review', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'ReviewCtrl'
        }).
        when('/review/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'ReviewCtrl'
        }).
        when('/reviews/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'ReviewAddCtrl'
        }).
        when('/about_us', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'AboutUsCtrl'
        }).
        when('/about_us/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'AboutUsCtrl'
        }).
        when('/about_uss/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'AboutUsAddCtrl'
        }).
        when('/delivery', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'DeliveryCtrl'
        }).
        when('/delivery/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'DeliveryCtrl'
        }).
        when('/deliverys/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'DeliveryAddCtrl'
        }).
        when('/call_measurer', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'MeasurerCtrl'
        }).
        when('/call_measurer/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'MeasurerCtrl'
        }).
        when('/call_measurers/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'MeasurerAddCtrl'
        }).
        when('/assembly', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'AssemblyCtrl'
        }).
        when('/assembly/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'AssemblyCtrl'
        }).
        when('/assemblys/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'AssemblyAddCtrl'
        }).
        when('/spec_offers', {
            templateUrl: 'views/backend/pages/index.html',
            controller: 'SpecOffersCtrl'
        }).
        when('/spec_offers/:id', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'SpecOffersCtrl'
        }).
        when('/spec_offerss/add', {
            templateUrl: 'views/backend/pages/add.html',
            controller: 'SpecOffersAddCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix("!");
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
