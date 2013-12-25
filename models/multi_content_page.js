/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FileInfoSchema = require('./file_info'),
    PageSchema = require('./page');


/**
 * Product Schema
 */
var MultiContentPageSchema = new Schema({
    type: String,
    ref: String,
    content: [PageSchema],
    galleryPhotos: [FileInfoSchema]
});

/**
 * Validations
 */
MultiContentPageSchema.index({ref: 1, type: 1}, {unique: true});

/**
 * Statics
 */
MultiContentPageSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};
mongoose.model('MultiContentPage', MultiContentPageSchema);
