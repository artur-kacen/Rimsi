/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FileInfoSchema = require('./file_info');

var ProductContentSchema = new Schema({
    language: String,
    name: String,
    type: String,
    portfolio: String
})

/**
* Product Schema
*/
var ProductSchema = new Schema({
    content: [ProductContentSchema],
    photo_dir: String,
    materials: [{
        type: Schema.ObjectId,
        ref: 'Material'
    }],
    mainPhoto: FileInfoSchema,
    galleryPhotos: [FileInfoSchema]
});

/**
* Validations
*/


/**
 * Statics
 */
ProductSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};
mongoose.model('Product', ProductSchema);
mongoose.model('ProductContent', ProductContentSchema);
