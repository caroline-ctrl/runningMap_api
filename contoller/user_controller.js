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
            bcrypt.compareSync(pass, match.password);
        }
    }).then(user => {
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