const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: { type: String, required: true},
      quantily : { type: Number, required: true},
      image: { type: String, rquired: true },
      price: { type: String, rquired: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      }
    }
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, rquired: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  paymentMethod: {
    type: String,
    required: true
  },

  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String }
  },

  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },

  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },

  paidAt: {
    type: Date
  },

  isDelivered: {
    type: Boolean, 
    required: true,
    default: false,
  },

  isDelivered: {
    type: Boolean, 
    required: true,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order