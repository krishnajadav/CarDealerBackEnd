const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

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
                return res.status(404).send({message: "User Not found."});
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
                return res.status(404).send({message: "User Not found."});
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
                return res.status(404).send({message: "User Not found."});
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
                return res.status(404).send({message: "User Not found."});
            }
            // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
            let newPassword = (Math.random() + 1).toString(36).substring(7);

            user.password = bcrypt.hashSync(newPassword, 8);
            user.save((err, user) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }
                const mailData = {
                    from: 'tn220771@dal.ca',  // sender address
                    to: user.username,   // list of receivers
                    subject: 'New Password',
                    text: 'Your new password is ' + newPassword
                };
                transporter.sendMail(mailData, function (err, info) {
                    if(err)
                        console.log(err)
                    else
                        res.status(200).send({message: 'Password reset mail sent'});
                });
            });
        });
};