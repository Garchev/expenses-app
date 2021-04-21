const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { salt_rounds } = require('../config/config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
    },
    password: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    expenses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Expense'
    }]
})

userSchema.pre('save', function (next) {
    bcrypt.genSalt(salt_rounds)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })

});

module.exports = mongoose.model('User', userSchema);