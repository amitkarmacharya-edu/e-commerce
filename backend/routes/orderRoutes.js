const express = require('express')
const router = express.Router()
const { addOrderItem } = require('../controllers/orderController')
const protect = require("../middleware/authMiddleware");

router.route('/').post(protect, addOrderItem)

module.exports = router