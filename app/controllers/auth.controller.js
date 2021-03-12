const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {


        // Save User to Database
        User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
            .then(user => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        user.setRoles(roles).then(() => {
                            res.send({
                                status: 201,
                                message: "User was registered successfully!"
                            });
                        });
                    });
                } else {
                    // user role = 1
                    user.setRoles([1]).then(() => {
                        res.send({
                            status: 201,
                            message: "User was registered successfully!"
                        });
                    });
                }
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });

    };
