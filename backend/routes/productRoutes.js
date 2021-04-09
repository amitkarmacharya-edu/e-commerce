const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductsById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router
  .route("/")
    .get(getProducts)
    .post(protect, admin, createProduct);

router
  .route('/:id/review')
    .post(protect, admin, createProductReview)
    
router
  .route("/:id")
    .get(getProductsById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

module.exports = router;
