const Expense = require('../models/Expense');
const categories = ['advertising', 'benefits', 'car', 'equipment', 'fees', 'home office',
 'insurance', 'interest', 'labor', 'maintenance', 'materials', 'meals and entertainment', 
 'office supplies', 'other', 'professional services', 'rent', 'taxes', 'travel', 'utilities'];

const User = require('../models/User');

 async function getAll(id) {
    let user = await User.findById(id).populate('expenses').lean();
    return user.expenses;
}

function getOne(id) {
    return Expense.findById(id).lean();
}

async function create(data, userId) {
    if (data.merchant.length < 4) throw { message: 'Merchant should be at least 4 characters long' }
    if (data.total < 0) throw { message: 'Total must be a positive number' }
    if (!categories.includes(data.category)) throw { message: 'Choose a valid category!' }
    if (data.description.length > 30 ) throw { message: 'Expense description should be maximum 30 characters long!' }
    if (data.description.length < 3 ) throw { message: 'Expense description should be at least 3 characters long!' }
    if(data.report == 'on') data.report = true;
    
    let user = await User.findById(userId)
    let expense = new Expense({ ...data, creator: userId });
    user.expenses.push(expense);
    user.amount -=Number(data.total);
    await user.save()
    return expense.save();
}

async function refillTotal(amount, userId) {
    if(typeof(Number(amount))!= 'number') throw { message: 'Salary must be a number' }

    let user = await User.findById(userId)
    amount = Number(amount);
    user.amount += amount;
    return user.save();
}

function deleteOne(_id) {
    return Expense.deleteOne({ _id });
}

module.exports = {
    getAll,
    getOne,
    create,
    refillTotal,
    deleteOne

}