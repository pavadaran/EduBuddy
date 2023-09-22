const express = require('express');
const router = express.Router();
const connection = require('../dbconnection')
const userController = require('../controller/userController')
const auth = require('../middlewares/authentication')

router.route('/addUser').post(userController.addUser)
router.route('/checkPhoneAvailability').get(auth.authenticateToken, userController.checkPhoneAvailability)
router.route('/checkEmailAvailability').get(userController.checkEmailAvailability)
router.route('/loginUser').post(userController.loginUser)

module.exports = router;