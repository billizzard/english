var User  = require('../models').User;
var express = require('express');
var helper = require('../modules/helper');
var router  = express.Router();
const {getError} = require('../modules/errorHandler');
const logger = require('../modules/logger').dev;

router.get('/login', function(req, res) {
    let message = null
    if (req.query.reg) {
        message = helper.getSuccessMessage('Вы успешно зарегистрированы');
    }
    res.render('auth/login', message)
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
        logger.info('Registration new user');
        return res.redirect('login?reg=true');
    }).catch(err => {
        console.log(err);
        return next(getError(err, 'Не удалось зарегистрироваться', 400));
    });

});

module.exports = router;
