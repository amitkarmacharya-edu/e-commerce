const express = require('express')
const router = express.Router()
const { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController')
const { protect } = require("../middleware/authMiddleware");

router.route('/').post(protect, addOrderItem)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

module.exports = router