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


function login(req, res) {
    models.User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "Invalid credentials!"
            })
        } else {
            bcryptjs.compare(req.body.password, user.password, function (err, result) {
                try {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY);
                
                    res.status(200).json({
                        message: "Logged in successfully!",
                        token: token
                    });
                } catch (err) {
                    console.error("JWT Signing error:", err);
                    res.status(500).json({
                        message: "Error generating token",
                        error: err.message
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong while logging in...",
            error: error
        })
    });
}

module.exports = {
    signUp: signUp,
    login: login
}
