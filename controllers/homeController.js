const router = require('express').Router();
const { getAll } = require('../services/expenseService');

router.get('/', async (req, res) => {
    let expenses;
    if(req.user) {
        expenses = await getAll(req.user._id)
    }
  
        res.render('home', {expenses})
    
})


module.exports = router;