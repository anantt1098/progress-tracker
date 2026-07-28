const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const trackController = require("../controllers/track.controller");

const router = express.Router();

// Create Track
router.post("/", authMiddleware, trackController.createTrack);

// Get All Tracks
router.get("/", authMiddleware, trackController.getAllTracks);

// Get Single Track
router.get("/:id", authMiddleware, trackController.getTrackById);

// Update Track
router.put("/:id", authMiddleware, trackController.updateTrack);

// Update Daily Progress
router.patch(
  "/:id/progress",
  authMiddleware,
  trackController.updateDailyProgress
);

// Delete Track
router.delete("/:id", authMiddleware, trackController.deleteTrack);

module.exports = router;