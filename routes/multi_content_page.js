
var mongoose = require('mongoose'),
    MultiContentPage = mongoose.model('MultiContentPage'),
    _ = require('underscore'),
    fs = require('fs');

function load(id) {
    MultiContentPage.load(id, function(err, page) {

        if (!page) return next(new Error('Failed to load article ' + id));
        return page;
    });
}

exports.page = function(req, res, next, id) {
    MultiContentPage.load(id, function(err, page) {
        if (err) return next(err);
        if (!page) return next(new Error('Failed to load article ' + id));
        req.multiPage = page;
        next();
    });
};

exports.create = function(req, res) {
    var page = new MultiContentPage(req.body);

    page.save(function(err) {
        if (err) {
            res.send(500, {error: err});
        } else {
            res.jsonp(page);
        }
    });
};

exports.update = function(req, res) {
    MultiContentPage.load(req.params.id, function(err, page) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            page = _.extend(page, req.body);

            page.save(function(err) {
                res.jsonp(page);
            });
        }
    });

};

exports.destroy = function(req, res) {
    MultiContentPage.load(req.params.id, function(err, page) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            page.remove(function(err) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp(page);
                }
            });
        }
    });
};

exports.show = function(req, res) {
    MultiContentPage.load(req.params.id, function(err, page) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(page);
        }
    });

};

exports.find_all_types = function(req, res) {
    var type = req.params.type;
    MultiContentPage.find({type: type}).exec(function(err, pages) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            pages.forEach(function(page) {
                page.galleryPhotos.sort(gallerySortFunction);
            });
            res.jsonp(pages);
        }
    })
};

exports.find_type_content = function(req, res) {
    var type = req.params.type;
    var ref = req.params.ref;
    var lang = req.query.lang;
    MultiContentPage.findOne({type: type, 'content.ref': ref, 'content.language': lang}).exec(function(err, page) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            page.galleryPhotos.sort(gallerySortFunction);
            res.jsonp(page);
        }
    })
};

function gallerySortFunction(a, b) {
    var dateA = (a !== null && a.hasOwnProperty("lastModifiedDate")) ? new Date(a.lastModifiedDate) : 0;
    var dateB = (b !== null && b.hasOwnProperty("lastModifiedDate")) ? new Date(b.lastModifiedDate) : 0;
    return dateB-dateA;
}

//{'ref': 1, 'content.name': 1, 'content.language' : 1}
exports.get_titles = function(req, res) {
    var type = req.query.type;
    MultiContentPage.find({type: type}).select('ref content.name content.language')
        .exec(function(err, pages) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(pages)
            }
    })
};

exports.get_description = function(req, res) {
    var type = req.params.type;
    var count = req.query.count;
    var query = MultiContentPage.find({type: type}).select('type ref content.name content.language content.description content.mainPhoto content.createdDate');
    if (!isNaN(count)) {
        query.limit(count);
    }
    query.exec(function(err, pages) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(pages)
            }
        })
};