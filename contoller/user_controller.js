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
}