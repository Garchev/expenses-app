const handlebars = require('express-handlebars');
const express = require('express');
const cookie = require('cookie-parser');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.engine('hbs', handlebars( {
        extname: 'hbs',
        allowProtoMethods: true
    }));

    app.set('view engine', 'hbs')

    app.use('/static', express.static('static'));

    app.use(express.urlencoded({ extended: true }));

    app.use(cookie());

    app.use(auth);

} 