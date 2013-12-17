
var mongoose = require('mongoose'),
    Page = mongoose.model('Page'),
    _ = require('underscore'),
    fs = require('fs');

exports.page = function(req, res, next, id) {
    Page.load(id, function(err, page) {
        if (err) return next(err);
        if (!page) return next(new Error('Failed to load article ' + id));
        req.page = page;
        next();
    });
};

exports.create = function(req, res) {
    var page = new Page(req.body);

    page.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                page: page
            });
        } else {
            res.jsonp(page);
        }
    });
};

exports.update = function(req, res) {
    var page = req.page;

    page = _.extend(page, req.body);

    page.save(function(err) {
        res.jsonp(page);
    });
};

exports.destroy = function(req, res) {
    var page = req.page;

    page.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(page);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.page);
};

exports.find = function(req, res) {
    var ref = req.query.ref;
    var lang = req.query.language;
    Page.findOne({ref: ref, language: lang}).exec(function(err, page) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(page)
        }
    })
};

exports.get_titles = function(req, res) {
    Page.find().select('ref name language').exec(function(err, pages) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(pages)
        }
    })
};
