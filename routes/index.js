
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.render = function(req, res) {
    res.render('index');
};

exports.constructor = function(req, res) {
    res.render('constructor');
};