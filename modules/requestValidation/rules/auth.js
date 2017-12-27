module.exports = {

    'signup': function (req) {
        req.checkBody('email', 'Email обязателен').notEmpty()
        req.checkBody('email', 'Email неверный').isEmail()
        req.checkBody('password', 'Пароль обязателен').notEmpty()
        req.checkBody('password_repeat', 'Пароли не совпадают').equals(req.body.password)
    }

}