const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const pattern = /^[a-zA-Z0-9]+$/i;


const register = async ( username, password, rePassword, amount) => {
    
    if (await User.findOne({ username: username })) {
        throw { message: "Username already exists"}
    }
    if(username.length < 4) {
        throw {message: 'Username should be at least 5 characters!'};
     }
     if(!pattern.test(username)) {
         throw {message: 'Username should consist only English letters and/or numbers!'};
     }
     if(password.length < 4) {
         throw {message: 'Password should be at least 5 characters!'};
     }
     if(!pattern.test(password)) {
         throw {message: 'Password should consist only English letters and/or numbers!'};
     }
     if(password != rePassword) {
         throw {message: 'Passwords does not match!'};
     }
    user = new User({ username, password, amount});
    return user.save()
}

const login = async (username, password) => {
    let user = await User.findOne({ username })
    if (!user) throw { message: "No such user!"}
    let isEqual = bcrypt.compare(password, user.password)
    if (!isEqual) throw { message: "Invalid password"}

    return token = jwt.sign({ _id: user._id, username: user.username }, secret);
}



module.exports = {
    register,
    login
}