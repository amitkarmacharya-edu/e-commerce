const express = require("express");
const router = express.Router();
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route('/').get(protect, admin, getUsers);
router.route("/register").post(registerUser)
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser)

module.exports = router;
