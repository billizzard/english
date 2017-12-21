var models  = require('../models');
var express = require('express');
var bcrypt = require('bcryptjs');
var router  = express.Router();

router.get('/login', function(req, res) {
  res.render('auth/login')
});

router.get('/signup', function(req, res) {
    res.render('auth/signup')
});

router.post('/signup', function(req, res) {
    if (!req.requestValidate('auth')('signup')) {
        return res.render('auth/signup', { message : req.flash() });
    };

    models.User.create({
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        return res.render('auth/signup', { message : req.flash() });
    }).catch(err => {
        req.flash('danger', 'Не удалось зарегистрироваться');
        return res.render('auth/signup', { message : req.flash() });

    });
});

module.exports = router;
