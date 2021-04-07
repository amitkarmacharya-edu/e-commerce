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

module.exports = { addOrderItem, getOrderById };
