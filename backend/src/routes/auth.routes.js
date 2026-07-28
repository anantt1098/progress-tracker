const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Public Routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// Protected Routes
router.get("/me", authMiddleware, authController.getCurrentUser);
router.post("/logout", authMiddleware, authController.logoutUser);

module.exports = router;