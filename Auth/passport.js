const passport = require('passport');
const { inflateRaw } = require('zlib');
const { findOne } = require('../models/product');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done)=>{done(null, user.id)});
passport.deserializeUser((id, done)=>{User.findById(id, (err, user)=>{done(err, user);})});

//Sign up form
passport.use('local.signup', new LocalStrategy(
    {passReqToCallback: true},
    (req, username, password, done)=>{
        if( req.body.password != req.body.confirmpassword ){
            return done(null, false, req.flash('error', 'Invalid passwords match'));
        }else{
            User.findOne({username: username}, (err, user)=>{
                if(err){return done(err);}
                if(user){return done(null, false, req.flash('error', `Username ( ${username} )  is not available`));}
                if(!user){
                    const newuser = new User();
                    newuser.username = req.body.username;
                    newuser.password = newuser.hashPassword(req.body.password); // encrypts the new user`s password before saving it in the database
                    newuser.email = req.body.email;
                    newuser.phonenumber = req.body.phonenumber;
                    newuser.save( (err, user)=>{if(!err)return done(null, user, req.flash('success', 'Your profile is ready!'))
                    else{console.log(err)};});
                }         
            })
        }
    }
));

//Login form
passport.use('local.login', new LocalStrategy(
    {passReqToCallback: true},
    (req, username, password, done)=>{
        User.findOne({username: username}, (err, user)=>{
            if(err){return done(null, false, req.flash('error', 'Something went wrong'));}
            if(!user){return done(null, false, req.flash('error', 'user not found, you need to register'));}
            if(user)
            {if(user.comparePasswords(password, user.password)){return done(null, user, req.flash('success', 'Hello again'));}}
            else{return done(null, false, req.flash('error', 'Invalid password'))}
        })
    }
))

module.exports = passport;