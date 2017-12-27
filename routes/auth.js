var User  = require('../models').User;
var express = require('express');
var helper = require('../modules/helper');
var router  = express.Router();
const {getError, BadRequestError} = require('../modules/errorHandler');
const logger = require('../modules/logger').dev;

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.log(err.message);
        console.log(err.http_code);
        return next(getError(null, err.message, err.http_code));
    });
};

router.get('/login', function(req, res) {

    let message = null
    if (req.query.reg) {
        message = helper.getSuccessMessage('Вы успешно зарегистрированы');
    }
    res.render('auth/login', message)
});

router.get('/signup', asyncMiddleware( async function(req, res) {
    console.log('1');
    let user = null;
    user = await User.findByEmail('ww@ww.ww')
    throw new Error('dfdfdfd')
    console.log(user.email);
    console.log('2');



    res.render('auth/signup')
}));

router.post('/signup', asyncMiddleware (async function(req, res, next) {
    let errors = req.requestValidation('auth')('signup');
    if (errors) return next(getError(null, errors, 400));

    let user = await User.findByEmail(req.body.email)
    if (user) throw BadRequestError('Email занят')

    user = await User.create({ email: req.body.email, password: req.body.password })

    logger.info('Registration new user');
    return res.redirect('login?reg=true');

}));

module.exports = router;
