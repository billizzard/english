const user = require('../../../models/').User
module.exports = {
    'signup': function (req) {
        req.checkBody('email', 'Email обязателен').notEmpty()
        req.checkBody('email', 'Email неверный').isEmail()
        req.checkBody('email').custom(value => {
            return user.findByEmail(value).then(user => {
                console.log('--------------=====');
                if (user) {
                    throw new Error('Email занят');
                }
            })
        })
        req.checkBody('password', 'Пароль обязателен').notEmpty()
        req.checkBody('password_repeat', 'Пароли не совпадают').equals(req.body.password)
    }

}