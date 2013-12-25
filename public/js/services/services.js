/**
 * Created by KACENAR1 on 13.23.11.
 */
var services = angular.module('rimsi.services', ['ngResource']);

services.factory('ArticleFactory', function($resource){
    return $resource('/admin/products', {}, {
        query: { method: 'GET', isArray: true}
    })
});

/**
 * Product REST Factories
 */

services.factory('ProductsFactory', function($resource){
    return $resource('/products', {}, {
        query: { method: 'GET', isArray: true }
    })
});

services.factory('ProductFactory', function($resource){
    return $resource('/products/:productId', {productId: '@_id'}, {
        get: { method: 'GET' }
    })
});


services.factory('PagesFactory', function($resource){
    return $resource('/pages', {}, {
        query: { method: 'GET', isArray: true }
    })
});

services.factory('PageFactory', function($resource){
    return $resource('/page', {}, {
        query: { method: 'GET' }
    })
});

services.factory('MultiPageFactory', function($resource){
    var URL = '/multipage';
    return $resource(URL, {}, {
        get: { method: 'GET', url: URL+'/:type/:ref', params: {type: "type", ref: "ref"}  },
        query: { method: 'GET', url: URL+'/:type', isArray: true, params: {type: "type"} },
        titles: { method: 'GET', url: URL+'/titles', isArray: true},
        description: { method: 'GET', url: URL+'/description/:type', isArray: true, params: {type: "type"}}
    })
});
