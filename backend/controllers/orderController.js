const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc Create new order
// @route POST /api/orders
// @access private
const addOrderItem = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return
  } else {
    
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Create order by id
// @route POST /api/orders/:id
// @access private
const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  
  if(order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Ordr Not Found')
  }
});

// @desc Updates order to paid
// @route POST /api/orders/:id/pay
// @access private
const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  
  if(order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Payment Error')
  }
});

// @desc Get Order of the users
// @route GET /api/orders/myorders
// @access private
const getMyOrders = expressAsyncHandler(async (req, res) => {
  const order = await Order.find({user: req.user._id})
  res.json(order)
});

// @desc Get all orders
// @route GET /api/orders
// @access private/admin
const getAllOrders = expressAsyncHandler(async (req, res) => {
  const order = await Order.find().populate('user', 'id name')
  res.json(order)
});

module.exports = { addOrderItem, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders };
