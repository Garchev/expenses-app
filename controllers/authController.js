const router = require('express').Router();
const authService = require('../services/authService');
const { cookie_name } = require('../config/config');
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    authService.login(username, password)
        .then(token => {
            res.cookie(cookie_name, token, { httpOnly: true });
            res.redirect('/')
        })
        .catch(err => res.render('login', { error: err }))
})

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {

    const { username, password, rePassword, amount } = req.body;
    await authService.register(username, password, rePassword, amount)
        .then(createdUser => {
            res.redirect('/users/login');
        })
        .catch(err => res.render('register', { error: err }))

});

router.get('/logout', (req, res) => {
    res.clearCookie(cookie_name);
    res.redirect('/');
});

router.get('/:username', async (req, res) => {
    let user = await User.findById(req.user._id).populate('expenses');
    let totalSpend = user.expenses.reduce((a, b) => {
        return totalSpend += Number(b.total)
    }, 0)
    user.spent = totalSpend;
    user.merches = user.expenses.length;
    res.render('user', user);
})

module.exports = router;