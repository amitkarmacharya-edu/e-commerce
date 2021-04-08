const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductsById,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router
  .route("/")
    .get(getProducts);
    
router
  .route("/:id")
    .get(getProductsById)
    .delete(protect, admin, deleteProduct);

module.exports = router;
