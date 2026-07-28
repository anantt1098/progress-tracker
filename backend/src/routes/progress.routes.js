const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const progressController = require("../controllers/progress.controller");

const router = express.Router();

// Add Progress
router.post("/", authMiddleware, progressController.addProgress);

// Get Progress of a Track
router.get("/:trackId", authMiddleware, progressController.getProgress);

// Update Progress
router.put("/:id", authMiddleware, progressController.updateProgress);

// Delete Progress
router.delete("/:id", authMiddleware, progressController.deleteProgress);

module.exports = router;