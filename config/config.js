/**
 * Created by KACENAR1 on 14.4.1.
 */
var _ = require('underscore');

// Load app configuration

module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {});