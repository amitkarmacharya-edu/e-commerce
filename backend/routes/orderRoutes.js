const express = require('express')
const router = express.Router()
const { addOrderItem, getOrderById, updateOrderToPaid } = require('../controllers/orderController')
const protect = require("../middleware/authMiddleware");

router.route('/').post(protect, addOrderItem)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

module.exports = router