/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    name:  {
        type: String,
        unique: true
    },
    portfolio: String,
    photo_dir: String
});

/**
 * Validations
 */

// the below 4 validations only apply if you are signing up traditionally
ArticleSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Article', ArticleSchema);