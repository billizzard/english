var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport, user) {
    let User = user;
    let LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {

            let generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (user) {

                    return done(null, false, {
                        message: 'That email is already taken'
                    });

                } else {

                    let userPassword = generateHash(password);
                    let data = {
                        email: email,
                        password: userPassword,
                        // lastname: req.body.lastname
                    };

                    User.create(data).then(function(newUser, created) {

                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
}