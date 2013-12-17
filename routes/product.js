/**
 * Created by KACENAR1 on 13.24.11.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('underscore'),
    fs = require('fs');

/**
 * Find product by id
 */
exports.product = function(req, res, next, id) {
    Product.load(id, function(err, product) {
        if (err) return next(err);
        if (!product) return next(new Error('Failed to load article ' + id));
        req.product = product;
        next();
    });
};

/**
 * Create a product
 */
exports.create = function(req, res) {
    var product = new Product(req.body);

    product.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Update a product
 */
exports.update = function(req, res) {
    var product = req.product;

    product = _.extend(product, req.body);

    product.save(function(err) {
        res.jsonp(product);
    });
};

/**
 * Delete a product
 */
exports.destroy = function(req, res) {
    var product = req.product;

    product.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.product);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Product.find().exec(function(err, product) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(product);
        }
    });
};

exports.uploadPhoto = function(req, res) {
    var files = req.files;
    var file = req.files.file;
    fs.readFile(file.path, function (err, data) {
        // ...
        var newPath = __dirname + "/../public/images/gallery/" + file.originalFilename;
        fs.writeFile(newPath, data, function (err) {
            if (err == null) {
                res.send(200);
            } else {
                console.error(err);
            }
        });
    });
};