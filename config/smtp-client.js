/**
 * Created by KACENAR1 on 14.19.2.
 */
var simplesmtp = require("simplesmtp");
var smtp_pool = simplesmtp.createClientPool(25, process.env.EMAIL_HOST, {
    name: "rimsi.lv",
    //secureConnection: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER_PASS
    }
});

module.exports = smtp_pool;