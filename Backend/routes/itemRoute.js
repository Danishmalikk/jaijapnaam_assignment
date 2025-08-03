const express = require('express')
const authenticateToken = require('../middlewares/authenticateToken')
const { getAllItems, createItem, updateItem, deleteItem } = require('../controllers/itemController')
const router = express.Router()


router.get('/getAllItems', authenticateToken, getAllItems)
router.route('/createItem').post(authenticateToken, createItem)
router.put('/updateItem/:id', authenticateToken, updateItem)
router.delete('/deleteItem/:id', authenticateToken, deleteItem)

module.exports = router