/**
 * Created by KACENAR1 on 13.23.11.
 */
exports.index = function(req, res) {
    res.render('backend/index', {
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};;