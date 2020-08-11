const UserModel = require('../models/User_model');
const bcrypt = require('bcrypt-nodejs');
const nodeMailer = require('nodemailer');
const random = require('random');


// create user
exports.createUser = (req, res) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.body.avatar}`;

    const userInstance = new UserModel({
        avatar: imageUrl,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        pseudo: req.body.pseudo,
        mail: req.body.mail,
        city: req.body.city,
        gender: req.body.gender,
        age: req.body.age,
        password: bcrypt.hashSync(req.body.password),
        token: 0
    });
    userInstance.save().then(() => {
        res.status(200).json({
            message: "User créé"
        })
    }).catch(err => {
        res.status(400).json(err)
    })
};


// getAll
exports.getAll = (req, res) => {
    UserModel.find().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        res.status(400).json(err);
    })
}


// getById
exports.getById = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(400).json(err)
    })
}


// update
exports.updateUser = (req, res) => {
    // const thingObject = JSON.parse(req.body.avatar);
    const fileNameAvatar = req.body.avatar;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${fileNameAvatar}`;
    UserModel.findByIdAndUpdate(req.params.id, {
        avatar: imageUrl,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        pseudo: req.body.pseudo,
        mail: req.body.mail,
        city: req.body.city,
        gender: req.body.gender,
        age: req.body.age
    }).then(() => {
        res.status(200).json({
            message: "User modifié"
        })
    }).catch(err => {
        res.status(400).json(err)
    })
}


// update password
exports.updatePassword = (req, res) => {
    const newPassword = bcrypt.hashSync(req.body.NewPasswd);

    UserModel.findOne({
        pseudo: req.body.pseudo
    }).then(user => {
        if (bcrypt.compareSync(req.body.oldPasswd, user.password)) {
            user.update({
                password: newPassword
            }).then(() => {
                res.status(200).json({
                    message: 'mot de passe modifié'
                })
            }).catch(err => {
                res.json(err);
            });
        } else {
            res.send("erreur");
        }
    });
}


// mp oublié
exports.changePassword = (req, res) => {
    const hashPass = bcrypt.hashSync(req.body.password);
    UserModel.findOneAndUpdate({token: req.body.token},
        {password: hashPass}).then(user => {
            res.json(user);
        }).catch(err => {
            res.json(err)
        })
    // const hashPass = bcrypt.hashSync(req.body.password);
    // UserModel.findOne({token: req.body.token}).then(user => {
    //     res.json(user);
    //     user.update({password: hashPass}).then(() => {
    //         res.json({
    //             message: 'password modifié'
    //         })
    //     }).catch(err => {
    //         res.json(err);
    //     })
    // }).catch(err => {
    //     res.json(err);
    // })
}


// login
exports.login = (req, res) => {
    // recupère le user a partir du mail, 
    // match renferme l'objet user
    UserModel.findOne({
        mail: req.body.mail
    }, (error, match) => {
        if (bcrypt.compareSync(req.body.password, match.password)) {
            UserModel.findById(match._id).then(user => {
                res.status(200).json(user);
            }).catch(err => {
                res.status(400).json(err);
            });
        }
    });
}


// getByPseudo
// return object user
exports.getByPseudo = (req, res) => {
    UserModel.findOne({
            pseudo: req.body.pseudo
        })
        .then(user => {
            res.status(200).json(user)
        }).catch(err => {
            res.status(400).json(err)
        })
}

// verification mail lors du mp oublié
exports.checkMail = (req, res) => {
    UserModel.findOne({
        mail: req.body.mail
    }).then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.json(err)
    })
}


// Send mail
exports.sendMail = (req, res) => {
    const securityCode = this.numberRandom();

    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: 'duon.caroline@gmail.com',
            pass: 'caroD34270*'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOption = {
        from: "duon.caroline@gmail.com",
        to: req.body.mail,
        subject: "Mot de passe oublié",
        html: 'Bonjour,<br> Voici le code a renseigner <b>' + securityCode + '</b>'
    };

    UserModel.findOne({
        mail: req.body.mail
    }).then(user => {
        if (user !== 'null'){
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            user.update({
                    token: securityCode
            }).then(() => {
                res.status(200).json({
                    message: "token enregisté"
                })
            }).catch(err => {
                res.json(err);
            })
        } else {
            res.json({
                message: "L'adresse mail n'existe pas"
            })
        }
    }).catch(err => {
        res.json(err)
    })



    // UserModel.findOne({
    //     mail: req.body.mail
    // }).then(user => {
    //     user.update({
    //         token: securityCode
    //     }).then(() => {
    //         res.status(200).json({
    //             message: "token enregisté"
    //         })
    //     }).catch(err => {
    //         res.json(err);
    //     })
    // }).catch(err => {
    //     res.json(err)
    // })
}


// securityCode
exports.numberRandom = () => {
    return random.int(min = 100000, max = 900000);
}


// comparaison du code securité
exports.securityCode = (req, res) => {
    UserModel.findOne({
        mail: req.body.mail
    }).then(user => {
        res.status(200).json(user);
    }).catch(err => {
        res.json(err);
    })
}


// delete
exports.deleteUser = (req, res) => {
    UserModel.findByIdAndDelete(req.params.id).then(user => {
        res.status(200).json({
            message: "user supprimé"
        });
    }).catch(err => {
        res.json(err);
    })
}