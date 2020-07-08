const userController = require('../contoller/user_controller');
const express = require('express');

const router = express.Router();

router.put('/activer/:id', userController.activeUser);
router.put('/archive/:id', userController.archive);
router.put('/update/:id', userController.updateUser);
router.get('/user/:id', userController.getById);
router.get('/users', userController.getAll);
router.post('/create', userController.createUser);
router.post('/log', userController.login);
router.post('/monCompte', userController.getByPseudo);


module.exports = router;