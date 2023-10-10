const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    isAdmin: false
});

userSchema.methods.hashPassword = (password) => {return bcrypt.hashSync(password, bcrypt.genSaltSync(10));}
userSchema.methods.comparePasswords = (password, hash) => {return bcrypt.compareSync(password,hash);}
const user = mongoose.model('user', userSchema);

module.exports = user;