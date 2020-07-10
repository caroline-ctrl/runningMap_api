const userController = require('../contoller/user_controller');
const express = require('express');

const router = express.Router();

router.put('/update/:id', userController.updateUser);
router.get('/user/:id', userController.getById);
router.put('/archive', userController.archive);
router.put('/newPassword', userController.updatePassword);
router.get('/users', userController.getAll);
router.post('/create', userController.createUser);
router.post('/log', userController.login);
router.post('/monCompte', userController.getByPseudo);
router.post('/mail', userController.sendMail);


module.exports = router;