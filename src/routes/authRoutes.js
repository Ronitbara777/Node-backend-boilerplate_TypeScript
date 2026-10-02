const express = require("express");
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", protect, logoutUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
