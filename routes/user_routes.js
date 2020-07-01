const userController = require('../contoller/user_controller');
const express = require('express');

const router = express.Router();

router.post('/', userController.createUser);

module.exports = router;