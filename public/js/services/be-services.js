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

services.factory('PageFactory', function($resource){
    return $resource('/admin/page', {}, {
        query: { method: 'GET' },
        create: { method: 'POST' },
        by_id: { method: 'GET', url: '/admin/page/:pageId', params:  {pageId: '@_id'}},
        update: { method: 'PUT', url: '/admin/page/:pageId', params:  {pageId: '@_id'}},
        delete: { method: 'DELETE', url: '/admin/page/:pageId', params:  {pageId: '@_id'}}
    })
});

services.factory('MultiPageFactory', function($resource){
    var URL = '/admin/multipage';
    return $resource(URL, {}, {
        query: { method: 'GET', url: URL+'/type/:type', params: {type: '@type'}, isArray: true},
        create: { method: 'POST' },
        get: { method: 'GET', url: URL+'/:id', params:  {id: '@_id'}},
        update: { method: 'PUT', url: URL+'/:id', params:  {id: '@_id'}},
        delete: { method: 'DELETE', url: URL+'/:id', params:  {id: '@_id'}}
    })
});

services.factory('SmtpFactory', function($resource){
    var URL = '/smtp';
    return $resource(URL, {}, {
        query: { method: 'GET',  params: {inbound: '@inbound'}, isArray: true},
        get: { method: 'GET', url: URL+'/:uid', params: {uid: '@uid'}},
        delete: { method: 'DELETE', url: URL+'/:uid', params: {uid: '@uid'}},
        seen: { method: 'POST', url: URL+'/:uid/seen', params: {uid: '@uid', unseen: '@unseen'}},
        flag: { method: 'POST', url: URL+'/:uid/flag', params: {uid: '@uid', setFlag: '@setFlag'}},
        send: { method: 'POST' }

    })
});

services.factory('Email', function() {
    return {};
})
