const express = require("express");
const authController = require("../controllers/authController");
const {
  validateRequest,
  registerSchema,
  loginSchema,
} = require("../middlware/validation");
const { authenticateToken } = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: "Too many authentication attempts, please try after sometime",
  },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, //1hour
  max: 3, // 3 attempts per hour
  message: {
    success: false,
    message: "Too many password reset attempts, please try after sometime",
  },
});

// Routes
router.post("/register",validateRequest(registerSchema),authController.register);
router.post("/login", validateRequest(loginSchema), authLimiter, authController.login);
router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authenticateToken, authController.logout)
router.get('/verify-email/:token', authenticateToken, authController.verifyEmail)
router.post('forgot-password', forgotPasswordLimiter, authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

module.exports = router