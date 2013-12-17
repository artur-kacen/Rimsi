/**
 * Created by KACENAR1 on 13.12.12.
 */
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    FileInfoSchema = require('./file_info');

var PageSchema = new Schema({
    ref: String,
    name: String,
    language: String,
    content: String,
    mainPhoto: FileInfoSchema
});
PageSchema.index({ref: 1, language: 1}, {unique: true});
PageSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};
mongoose.model('Page', PageSchema);