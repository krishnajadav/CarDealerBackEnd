// Author: Tuan Hamid
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

// register function references https://www.bezkoder.com/node-js-mongodb-auth-jwt/
exports.register = (req, res) => {
    const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        isEnabled: true,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({message: 'User created'});
    });
};

// login function references https://www.bezkoder.com/node-js-mongodb-auth-jwt/
exports.login = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!user) {
                return res.status(404).send({message: "User not found"});
            }
            let isPasswordValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            if (user.isEnabled === false) {
                return res.status(401).send({
                    message: "Account disabled!"
                });
            }
            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                role: user.role,
                accessToken: token
            });
        });
};

exports.updatePassword = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!user) {
                return res.status(404).send({message: "User not found"});
            }
            user.password = bcrypt.hashSync(req.body.password, 8);
            user.save((err, user) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                res.status(200).send({message: 'Password updated'});
            });
        });
};

exports.findAllEmployees = (req, res) => {
    User.find({
        role: "employee"
    }, { firstName: 1, lastName: 1, username: 1, isEnabled: 1 })
        .exec((err, users) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send(users);
        });
};

exports.updateStatus = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!user) {
                return res.status(404).send({message: "User not found"});
            }
            user.isEnabled = req.body.isEnabled;
            user.save((err, user) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                res.status(200).send({message: 'Status updated'});
            });
        });
};

exports.resetPasswordByEmail = (req, res) => {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: 'sl.rahmanhamid@gmail.com',
            pass: 'usvrudjtdrkienos',
        },
        secure: true,
    });


    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            if (!user) {
                return res.status(404).send({message: "User not found"});
            }
            // newPassword creation references https://stackoverflow.com/a/8084248
            let newPassword = (Math.random() + 1).toString(36).substring(7);

            user.password = bcrypt.hashSync(newPassword, 8);
            user.save((err, user) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                // nodemailer referenced from https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee
                const mailData = {
                    from: 'tn220771@dal.ca',
                    to: user.username,
                    subject: 'New Password',
                    text: 'Your new password is ' + newPassword
                };
                transporter.sendMail(mailData, function (err, data) {
                    if(err)
                        console.log(err)
                    else
                        res.status(200).send({message: 'Password reset mail sent'});
                });
            });
        });
};