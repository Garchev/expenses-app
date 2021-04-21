const mongoose = require('mongoose');


const expenseScheme = new mongoose.Schema({
    merchant : {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },   
    category: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },   
    report: {
        type: Boolean,
        default: false
    },
    
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = mongoose.model('Expense', expenseScheme);