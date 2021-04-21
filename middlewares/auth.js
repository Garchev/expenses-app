const { secret, cookie_name } = require('../config/config');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let token = req.cookies[cookie_name];
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.clearCookie(cookie_name);
            } else {
                req.user = decoded;
                res.locals.user = decoded;
                res.isAuth = true;
            }
        })
    }

    next();
}
