const express = require('express')
const router = express.Router()
const { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered } = require('../controllers/orderController')
const { protect, admin } = require("../middleware/authMiddleware");

router.route('/').post(protect, addOrderItem).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

module.exports = router