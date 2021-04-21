const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const expenseService = require('../services/expenseService'); 

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    let userId = req.user._id;
    
    await expenseService.create(req.body, userId)
        .then(() => res.status(201).redirect('/'))
        .catch((err) => res.render('create', { error: err }))
});

router.get('/:expenseId/details', isAuth, async (req, res) => {
    let expense = await expenseService.getOne(req.params.expenseId);
    res.render('details', { expense })
});

router.post('/refill', isAuth, (req, res) => {
    console.log(req.body.amount);
    expenseService.refillTotal(req.body.amount, req.user._id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => res.render('home', {error: err}))
});


router.get('/:expenseId/delete', isAuth, (req, res) => {
    expenseService.deleteOne(req.params.expenseId)
        .then(() => res.redirect('/'))
        .catch((err) => res.render('home', { error: err }))
});

module.exports = router;
