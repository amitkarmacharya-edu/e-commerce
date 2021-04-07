const express = require('express')
const router = express.Router()
const { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController')
const protect = require("../middleware/authMiddleware");

router.route('/').post(protect, addOrderItem)
router.route('/:id').get(protect, getOrderById)
router.route('/myorders').put(protect, updateOrderToPaid)
router.route('/orders').get(protect, getMyOrders)

module.exports = router