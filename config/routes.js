var async = require('async');

module.exports = function(app, passport, auth) {
    // Backend

    // User routes
    var user = require('./../routes/user');
    var admin = require('./../routes/admin');
    var article = require('./../routes/article');
    var product = require('./../routes/product');
    var multi_page = require('./../routes/multi_content_page');
    var page = require('./../routes/page');

    app.get('/admin', auth.requiresLogin, admin.index);
    app.get('/admin/login', user.login);
    app.get('/admin/signup', auth.requiresLogin, user.signup);
    app.get('/admin/logout', user.logout);

    //Setting up the user api
    app.post('/admin/user', auth.requiresLogin, user.create);

    app.post('/admin/user/session', passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: 'Invalid email or password.'
    }), user.session);

    app.get('/admin/user/me', auth.requiresLogin, user.me);
    app.get('/admin/user/:userId', auth.requiresLogin, user.show);

    //Finish with setting up the userId param
    app.param('userId', user.user);

    // MultiPage routes
    app.get('/admin/multipage/type/:type', auth.requiresLogin, multi_page.find_all_types);
    app.post('/admin/multipage', auth.requiresLogin, multi_page.create);
    app.get('/admin/multipage/:id', auth.requiresLogin, multi_page.show);
    app.put('/admin/multipage/:id', auth.requiresLogin, multi_page.update);
    app.del('/admin/multipage/:id', auth.requiresLogin, multi_page.destroy);
    app.param('multiPageId', multi_page.page);

    //Product routes
    app.get('/admin/products', auth.requiresLogin, product.all);
    app.post('/admin/products', auth.requiresLogin, product.create);
    app.get('/admin/products/:productId', auth.requiresLogin, product.show);
    app.put('/admin/products/:productId', auth.requiresLogin, product.update);
    app.del('/admin/products/:productId', auth.requiresLogin, product.destroy);

    app.post('/admin/upload', auth.requiresLogin, product.uploadPhoto);
    //Finish with setting up the userId param
    app.param('productId', product.product);

    // Page routes
    app.get('/admin/page/:pageId', auth.requiresLogin, page.show);
    app.get('/admin/page', auth.requiresLogin, page.find);
    app.post('/admin/page', auth.requiresLogin, page.create);
    app.put('/admin/page/:pageId', auth.requiresLogin, page.update);
    app.del('/admin/page/:pageId', auth.requiresLogin, page.destroy);
    app.param('pageId', page.page);


    //Frontend
    //Article Routes
    app.get('/articles', article.get_all);/*
    app.post('/articles', auth.requiresLogin, article.create);
    app.get('/articles/:articleId', article.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, article.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, article.destroy);*/

    //Finish with setting up the articleId param
    //app.param('articleId', article.article);
    app.get('/products', product.all);
    app.get('/products/:productId', product.show);

    app.get('/pages', page.get_titles);
    app.get('/page', page.find);

    app.get('/multipage/titles', multi_page.get_titles);
    app.get('/multipage/description/:type', multi_page.get_description);
    app.get('/multipage/:type', multi_page.find_all_types);
    app.get('/multipage/:type/:ref', multi_page.find_type_content);


    //Home route
    var index = require('./../routes/index');
    app.get('/', index.render);

};