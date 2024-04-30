const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res) {
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

module.exports = {
    signUp: signUp
}
