import express from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getUserProfile,
} from "../controllers/authController";
import {protect} from "../middleware/authMiddleware";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", protect, logoutUser);
router.get("/profile", protect, getUserProfile);

export default router;
