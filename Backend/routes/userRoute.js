const express = require('express')
const { getUser, createUser, loginUser } = require('../controllers/userController')
const authenticateToken = require('../middlewares/authenticateToken')
const router = express.Router()


router.route('/getuser').get(authenticateToken, getUser)
router.route('/register').post(createUser)
router.route('/loginUser').post(loginUser)

module.exports = router