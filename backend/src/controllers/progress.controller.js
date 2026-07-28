const progressModel = require("../models/progress.model");
const trackModel = require("../models/track.model");

// Add Progress
async function addProgress(req, res) {
    try {
        const { trackId, day, hoursStudied, notes } = req.body;

        if (!trackId || !day || !hoursStudied) {
            return res.status(400).json({
                message: "Track ID, day and hours studied are required."
            });
        }

        const track = await trackModel.findOne({
            _id: trackId,
            userId: req.user._id
        });

        if (!track) {
            return res.status(404).json({
                message: "Track not found."
            });
        }

        const existingProgress = await progressModel.findOne({
            trackId,
            day,
            userId: req.user._id
        });

        if (existingProgress) {
            return res.status(400).json({
                message: "Progress for this day already exists."
            });
        }

        const progress = await progressModel.create({
            trackId,
            userId: req.user._id,
            day,
            hoursStudied,
            notes
        });

        return res.status(201).json({
            message: "Progress added successfully.",
            progress
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Get Progress of a Track
async function getProgress(req, res) {
    try {
        const { trackId } = req.params;

        const progress = await progressModel.find({
            trackId,
            userId: req.user._id
        }).sort({ day: 1 });

        return res.status(200).json({
            message: "Progress fetched successfully.",
            progress
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Update Progress
async function updateProgress(req, res) {
    try {
        const { id } = req.params;
        const { hoursStudied, notes } = req.body;

        const progress = await progressModel.findOne({
            _id: id,
            userId: req.user._id
        });

        if (!progress) {
            return res.status(404).json({
                message: "Progress not found."
            });
        }

        if (hoursStudied) progress.hoursStudied = hoursStudied;
        if (notes) progress.notes = notes;

        await progress.save();

        return res.status(200).json({
            message: "Progress updated successfully.",
            progress
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Delete Progress
async function deleteProgress(req, res) {
    try {
        const { id } = req.params;

        const progress = await progressModel.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!progress) {
            return res.status(404).json({
                message: "Progress not found."
            });
        }

        return res.status(200).json({
            message: "Progress deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {
    addProgress,
    getProgress,
    updateProgress,
    deleteProgress
};