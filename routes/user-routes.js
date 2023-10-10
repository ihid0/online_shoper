const router = require('express').Router();
const user = require('../models/user');
const passport = require('passport');
const userController = require('../controllers/userControllers');

isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}

//sign up page
router.get('/signup', userController.signupget);
router.post('/signup', userController.signuppost);

//sign in
router.get('/login', userController.loginget);
router.post('/login', userController.loginpost);

//profile
router.get('/profile', isAuthenticated, userController.profile);

//logout
router.get('/logout', userController.logout);

module.exports = router;