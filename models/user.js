'use strict';
const bcrypt = require('bcrypt-nodejs');
const constants = require('../constants/app')


module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        timestamps: true,
        updatedAt: false,

        classMethods: {
            findByEmail: function(email) {
                 return User.findOne({
                    where: {
                        email: email
                    }
                })

            },

            // findByEmail: function(email) {
            //     console.log('222222');
            //     return new Promise((resolve, reject) => {
            //         Model.User.findOne({
            //             where: {
            //                 email: email
            //             }
            //         }).then(user => {
            //             resolve(user);
            //         });
            //     });
            // }
        },

        instanceMethods: {

            passwordToHash: function () {
                return new Promise((resolve, reject) => {
                    let that = this;
                    bcrypt.hash(this.password, null, null, function (err, hash) {
                        if (err) {
                            reject(err);
                        } else {
                            that.password = hash;
                            resolve();
                        }
                    });
                })
            }

        }
    });

    User.associate = function (models) {
        models.User.hasMany(models.Task);
    };

    User.hook('beforeCreate', (model, options) => {
        return new Promise(function(resolve, reject) {
            model.passwordToHash().then(() => {
                resolve()
            }).catch(err => {
                reject(err)
            }) ;
        });
    });

    return User;
};
