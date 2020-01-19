const router = require('express').Router();
const Users = require('../models/Users');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Please, You write a name'});
    }
    if(email.length <= 0){
        errors.push({text: 'Please, You write a email'});
    }
    if(password != confirm_password){
        errors.push({text: 'The password does not match'});
    }
    if(password < 4){
        errors.push({text: 'The password must be at least 4 characters'});
    }
    if(errors.length > 0){
        res.render('users/signup', { errors, name, email, password, confirm_password });
    }else{
        const userEmail = await Users.findOne({email: email});
        if(userEmail){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }
        const newUser = new Users({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
});

module.exports = router;