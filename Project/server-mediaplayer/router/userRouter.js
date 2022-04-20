const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.post('/', userController.authenticate);
console.log('after router !!');

module.exports = router;