const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc Fetch all products
// @route GET /api/products
// @access public
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch single products
// @route GET /api/products/:id
// @access public
const getProductsById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

module.exports = { getProducts, getProductsById };
