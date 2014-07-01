/**
 * Created by KACENAR1 on 14.13.2.
 */
//var MailListener = require("mail-listener2");
var inbox = require("inbox");
var client = inbox.createConnection(993, process.env.EMAIL_HOST, {
    secureConnection: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER_PASS
    }
});

client.connect();
client.on("connect", function(){
    console.log("Successfully connected to server");
    client.openMailbox("INBOX", {readOnly: false}, function(error, info){
        if(error) throw error;
        console.log("Message count in INBOX: " + info.count);
    });

});
module.exports = client;
