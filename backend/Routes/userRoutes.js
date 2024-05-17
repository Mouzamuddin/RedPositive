const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

baseUrl = '/api/users'

router.post(baseUrl, userController.createUser)
router.get(baseUrl, userController.getUser)
router.get(baseUrl + '/:id', userController.getUserById)
router.put(baseUrl + '/:id', userController.updateUser)
router.delete(baseUrl + '/:id', userController.deleteUser)

module.exports = router;
