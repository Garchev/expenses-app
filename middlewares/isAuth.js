const { secret, cookie_name } = require('../config/config');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let token = req.cookies[cookie_name];
        if (!req.user) return res.render('404', {error: {message: 'You should be logged in to see this page.'}});

    next();
}