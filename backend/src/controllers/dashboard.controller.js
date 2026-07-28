const trackModel = require("../models/track.model");
const progressModel = require("../models/progress.model");

async function getDashboard(req, res) {
    try {
        const userId = req.user._id;

        const totalTracks = await trackModel.countDocuments({ userId });

        const completedTracks = await trackModel.countDocuments({
            userId,
            status: "Completed"
        });

        const inProgressTracks = await trackModel.countDocuments({
            userId,
            status: "In Progress"
        });

        const notStartedTracks = await trackModel.countDocuments({
            userId,
            status: "Not Started"
        });

        const progress = await progressModel.find({ userId });

        const totalHoursStudied = progress.reduce(
            (total, item) => total + item.hoursStudied,
            0
        );

        const completionPercentage =
            totalTracks === 0
                ? 0
                : ((completedTracks / totalTracks) * 100).toFixed(2);

        return res.status(200).json({
            totalTracks,
            completedTracks,
            inProgressTracks,
            notStartedTracks,
            totalHoursStudied,
            completionPercentage
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {
    getDashboard
};