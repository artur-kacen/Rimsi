/**
 * Created by KACENAR1 on 13.8.12.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FileInfoSchema = new Schema({
    name: String,
    size: Number,
    type: String
});

/**
 * Validations
 */



mongoose.model('FileInfo', FileInfoSchema);
