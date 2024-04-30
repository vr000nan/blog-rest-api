const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res) {

    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email already exists!"
            });
        } else {
            bcryptjs.genSalt(10, function (err, salt) {
                if (err) {
                    return res.status(500).json({
                        message: "Error generating salt: " + err.message
                    });
                }
                bcryptjs.hash(req.body.password, salt, function (err, hash) {
                    if (err) {
                        return res.status(500).json({
                            message: "Error hashing password: " + err.message
                        });
                    }
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    };
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User created successfully",
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong while creating user...",
                            error: error.message
                        });
                    });
                });
            });
        }
    }).catch(error => {
        console.error(error);
    })
}

module.exports = {
    signUp: signUp
}
