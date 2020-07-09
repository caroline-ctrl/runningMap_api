const UserModel = require('../models/User_model');
const bcrypt = require('bcrypt-nodejs');

// create user
exports.createUser = (req, res) => {
    let password1 = req.body.password
    let password = bcrypt.hashSync(password1);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let pseudo = req.body.pseudo;
    let mail = req.body.mail;
    let city = req.body.city;
    let gender = req.body.gender;
    let age = req.body.age;
    let is_active = true;
    // let token = req.body.token;
    const userInstance = new UserModel({
        firstname,
        lastname,
        pseudo,
        mail,
        city,
        gender,
        age,
        password,
        is_active,
        // token
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
    const id = req.params.id;

    // this.hashPassword();
    let password1 = req.body.password
    let password = bcrypt.hashSync(password1);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let pseudo = req.body.pseudo;
    let mail = req.body.mail;
    let city = req.body.city;
    let gender = req.body.gender;
    let age = req.body.age;
    let is_active = req.body.is_active;
    // let token = req.body.token;


    UserModel.findByIdAndUpdate(id, {
        firstname,
        lastname,
        pseudo,
        mail,
        city,
        gender,
        age,
        password,
        is_active,
        // token
    }).then(() => {
        res.status(200).json({
            message: "User modifié"
        })
    }).catch(err => {
        res.status(400).json(err)
    })
}


// update password
exports.updatePsswd = (req, res) => {
    const passOld = req.body.oldPasswd;
    const passNew = req.body.NewPasswd;
    const pseudo = req.body.pseudo;
    const id = req.params.id;

    // je recupère l'objet user en fonction du pseudo
    UserModel.findOne({pseudo: pseudo}, (error, match) => {
        if(match !== null) {
            // je compare l'ancien mp avec celui en bdd
            const compare = bcrypt.compareSync(passOld, match.password);
            console.log(compare);

            if(compare){
                UserModel.findByIdAndUpdate(id, {
                    firstname: match.firstname,
                    lastname: match.lastname,
                    pseudo: pseudo,
                    mail: match.mail,
                    city: match.city,
                    gender: match.gender,
                    age: match.age,
                    password: bcrypt.hashSync(passNew),
                    is_active: match.is_active
                }).then(() => {
                    res.status(200).json({
                        message: "mot de passe modifié"
                    });
                }).catch(err => {
                    res.status(400).json(err);
                });
            } else {
                console.log('Votre ancien mot de passe n\'est pas bon.')
            }
        }
    })
};


// delete
// le delete permet d'archiver le user et non de le supprimer
// passe le is_active en false.
exports.archive = (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, {
        is_active: false
    }).then(() => {
        res.status(200).json({
            message: "User archivé"
        })
    }).catch(err => {
        res.status(400).json(err)
    })
}


// is_active = true
// permettre au user de réactiver son compte
exports.activeUser = (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, {
        is_active: true
    }).then(() => {
        res.status(200).json({
            message: "User activé"
        })
    }).catch(err => {
        res.status(400).json(err)
    })
}


// login
exports.login = (req, res) => {
    const mail = req.body.mail;
    const pass = req.body.password;
    // recupère le user a partir du mail, 
    // match renferme l'objet user
    UserModel.findOne({mail: mail}, (error, match) => {
        if(match !== null){
            const compare = bcrypt.compareSync(pass, match.password);

            if(compare){
                UserModel.findById(match._id).then(user => {
                    res.status(200).json(user);
                }).catch(err => {
                    res.status(400).json(err);
                });
            }
            
        }

    });
}


// getByPseudo
// 
// return object user
exports.getByPseudo = (req, res) => {
    UserModel.findOne({pseudo: req.body.pseudo})
    .then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.status(400).json(err)
    })
}



// exports.hashPassword = (req, res) => {
//     let firstname = req.body.firstname;
//     let password1 = req.body.password
//     let password = bcrypt.hashSync(password1);
//     let lastname = req.body.lastname;
//     let pseudo = req.body.pseudo;
//     let mail = req.body.mail;
//     let city = req.body.city;
//     let gender = req.body.gender;
//     let age = req.body.age;
//     let is_active = req.body.is_active;
// }