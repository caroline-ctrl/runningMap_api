const userController = require('../contoller/user_controller');
const express = require('express');

const router = express.Router();

router.put('/archive/:id', userController.archive);
router.put('/update/:id', userController.updateUser);
router.get('/user/:id', userController.getById);
router.post('/create', userController.createUser);

module.exports = router;