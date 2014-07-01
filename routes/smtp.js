/**
 * Created by KACENAR1 on 14.22.1.
 */
var request = require('request'),
    mongoose = require('mongoose'),
    Email = mongoose.model('Email'),
    qs = require('querystring');
var MailComposer = require("mailcomposer").MailComposer;
var MailParser = require("mailparser").MailParser;

var imap_client = require("../config/imap-listner");
var smtp_pool = require("../config/smtp-client");

var smtpURL = "https://api.mailgun.net/v2/";
var smtpDomain = "rimsi.lv";


exports.sendEmail = function(req, res) {
    var mailcomposer = new MailComposer();
    var files = req.body.file;
    var file = req.files;
    mailcomposer.setMessageOption(req.body.email);
    mailcomposer.setMessageOption({
        from: "'SIA RIMSI Mēbeļu ražošana' <info@rimsi.lv>"
    })
    smtp_pool.sendMail(mailcomposer, function(error, responseObj) {
        if (error) {
            res.send(500);
        } else {
            //responseObj may include failedRecipients which is an array with e-mail addresses that were rejected and message which is the last response from the server.
            res.send(200);
        }

    })
};

exports.getEmails = function(req, res) {
    var inbound = req.query.inbound;
    imap_client.listMessages(-10, function(err, messages){
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(messages);
        }
    });

};
exports.getEmail = function(req, res) {
    var mailparser = new MailParser();
    var uid = req.params.uid;
    mailparser.on("end", function(mail_object){
        console.log("Subject:", mail_object.subject);
        res.jsonp(mail_object);
        imap_client.addFlags(uid, ["\\Seen"], function(err, flags) {

        })
    });
    imap_client.createMessageStream(uid).pipe(mailparser);

}

exports.changeSeen = function(req, res) {
    var unseen = req.query.unseen;
    if (unseen) {
        imap_client.removeFlags(req.params.uid, ["\\Seen"], function(err, flags) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.send(200);
            }
        })
    } else {
        imap_client.addFlags(req.params.uid, ["\\Seen"], function(err, flags) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.send(200);
            }
        })
    }

}

exports.changeFlagged = function(req, res) {
    var setFlag = req.query.setFlag;
    if (setFlag) {
        imap_client.addFlags(req.params.uid, ["\\Flagged"], function(err, flags) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.send(200);
            }
        })
    } else {
        imap_client.removeFlags(req.params.uid, ["\\Flagged"], function(err, flags) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.send(200);
            }
        })
    }

}

exports.getAttachment = function(req, res) {
    var attachment_name = req.params.attach;
    var mailparser = new MailParser();
    var uid = req.params.uid;
    mailparser.on("end", function(mail_object){
        var attachment = null;
        for(var i=0; i<mail_object.attachments.length; i++){
            if (mail_object.attachments[i].fileName == attachment_name) {
                attachment = mail_object.attachments[i];
                break;
            }
        }
        res.set('Content-Type', attachment.contentType);
        res.set('Content-Disposition', attachment.contentDisposition);
        res.send(attachment.content);

    });
    imap_client.createMessageStream(uid).pipe(mailparser);
}

exports.deleteEmail = function(req, res) {
    var uid = req.params.uid;
    imap_client.deleteMessage(uid, function(err){
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.send(200);
        }
    });

}