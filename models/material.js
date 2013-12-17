/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Material Schema
 */
var MaterialSchema = new Schema({
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
MaterialSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

mongoose.model('Material', MaterialSchema);