/**
 * Created by KACENAR1 on 13.23.11.
 */
var services = angular.module('rimsi-be.services', ['ngResource']);

services.factory('ArticleFactory', function($resource){
    return $resource('/admin/products', {}, {
        query: { method: 'GET', isArray: true}
    })
})

/**
 * Product REST Factories
 */

services.factory('ProductsFactory', function($resource){
    return $resource('/admin/products', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('ProductFactory', function($resource){
    return $resource('/admin/products/:productId', {productId: '@_id'}, {
        get: { method: 'GET' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
});


services.factory('MaterialsFactory', function($resource){
    return $resource('/admin/materials', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('MaterialFactory', function($resource){
    return $resource('/admin/materials/:productId', {materialId: '@_id'}, {
        get: { method: 'GET' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
});

services.factory('ArticlesFactory', function($resource){
    return $resource('/admin/articles', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('ArticleFactory', function($resource){
    return $resource('/admin/articles/:productId', {articleId: '@_id'}, {
        get: { method: 'GET' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
    })
});
services.factory('PageFactory', function($resource){
    return $resource('/admin/page', {}, {
        query: { method: 'GET' },
        create: { method: 'POST' },
        by_id: { method: 'GET', url: '/admin/page/:pageId', params:  {pageId: '@_id'}},
        update: { method: 'PUT', url: '/admin/page/:pageId', params:  {pageId: '@_id'}},
        delete: { method: 'DELETE', url: '/admin/page/:pageId', params:  {pageId: '@_id'}}
    })
});
