const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const router = express.Router()

// @desc Fetch all products
// @route GET /api/products
// @access public
router.get('/', 
  expressAsyncHandler( async (req, res) => {
      const products = await Product.find({})
      res.json(products)
  })
)

// @desc Fetch single products
// @route GET /api/products/:id
// @access public
router.get('/:id', 
  expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found'})
    }
  })
)

module.exports = router