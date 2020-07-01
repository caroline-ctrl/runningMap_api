const UserModel = require('../models/User_model');
const mongodb = require('../app');

// create user
exports.createUser = (req, res) => {
    const userInstance = new UserModel({
        ...req.body
    });
    userInstance.save().then(() => {
        res.status(200).json({
            message: "User créé"
        })
    }).catch(err => {
        res.status(400).json(err)
    })
};


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
    UserModel.findByIdAndUpdate(id, {
        ...req.body
    }).then(() => {
        res.status(200).json({
            message: "User modifié"
        })
    }).catch(err => {
        res.status(400).json(err)
    })
}