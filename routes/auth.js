var User  = require('../models').User;
var express = require('express');
var router  = express.Router();
const {getError} = require('../modules/errorHandler');

router.get('/login', function(req, res) {
  res.render('auth/login')
});

router.get('/signup', function(req, res) {
    res.render('auth/signup')
});

router.post('/signup', function(req, res, next) {
    let errors = req.requestValidation('auth')('signup');
    if (errors) return next(getError(null, errors, 400));

    User.create({
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        req.flash('success', 'Вы успешно зарегистрированы');
        return res.render('auth/login');
    }).catch(err => {
        return next(getError(err, 'Не удалось зарегистрироваться', 400));
    });
});

module.exports = router;
