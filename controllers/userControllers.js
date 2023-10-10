const user = require('../models/user');
const product = require('../models/product');
const passport = require('passport');

module.exports = {

    signupget: (req,res)=>{
        res.render('../views/user/signup', {error: req.flash('error'), success: req.flash('success')});
    },
    signuppost: passport.authenticate('local.signup', {successRedirect:'/profile' , failureRedirect: '/signup', failureFlash: true, successFlash: true})
    ,
    loginget:(req,res)=>{
        res.render('../views/user/login', {error: req.flash('error'), success: req.flash('success')});
    },
    loginpost: passport.authenticate('local.login', {successRedirect:'/profile' , failureRedirect: '/login', failureFlash: true, successFlash: true})
    ,
    profile:(req,res)=>{
        res.render('../views/user/profile', {error: req.flash('error'), success: req.flash('success')});
    },
    logout: (req, res)=>{
        req.logout((err)=>{if(err) return next(err);
        res.redirect('/login');
        });
    }
}