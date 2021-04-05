const express = require('express')
const router = express.Router()
const { getProducts, getProductsById } = require('../controllers/productController')

router.route('/').get(getProducts)
router.route('/:id').get(getProductsById)

module.exports = router