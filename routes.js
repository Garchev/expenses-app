const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const expenseController = require('./controllers/expenseController'); 


router.use('/', homeController);
router.use('/users', authController);
router.use('/expenses', expenseController);

router.use('*', (req, res) => {
    res.render('404')
})

module.exports = router;