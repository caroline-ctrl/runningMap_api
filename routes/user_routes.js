const userController = require('../contoller/user_controller');
const express = require('express');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.put('/update/:id', multer, userController.updateUser);
router.get('/user/:id', userController.getById);
router.delete('/delete/:id', userController.deleteUser);
router.put('/newPassword', userController.updatePassword);
router.get('/users', userController.getAll);
router.post('/create', userController.createUser);
router.post('/log', userController.login);
router.post('/monCompte', userController.getByPseudo);
router.post('/mail', userController.sendMail);
router.post('/verifyCode', userController.securityCode);
router.put('/forgetPassword', userController.changePassword);


module.exports = router;