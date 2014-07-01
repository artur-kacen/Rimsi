/**
 * Created by KACENAR1 on 14.23.1.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmailSchema = new Schema({
    recipient: String,
    sender: String,
    from: String,
    subject: String,
    "body-plain": String,
    "body-html": String,
    "stripped-html": String,
    "attachment-count": Number,
    wasViewed: {type: Boolean, default: false},
    inbound: Boolean,
    cc: String,
    bcc: String,
    createdDate: { type: Date, default: Date.now }
});
EmailSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};
mongoose.model('Email', EmailSchema);