const trackModel = require("../models/track.model");
const userModel = require("../models/user.model");

// Create Track
async function createTrack(req, res) {
  try {
    const { title, description, duration } = req.body;

    if (!title || !duration) {
      return res.status(400).json({
        message: "Title and duration are required.",
      });
    }

    const track = await trackModel.create({
      title,
      description,
      duration,
      completedDays: 0,
      lastUpdated: null,
      status: "Not Started",
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Track created successfully.",
      track,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


// Get All Tracks
async function getAllTracks(req, res) {
  try {
    const tracks = await trackModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      tracks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


// Get Single Track
async function getTrackById(req, res) {
  try {
    const track = await trackModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!track) {
      return res.status(404).json({
        message: "Track not found.",
      });
    }

    return res.status(200).json({
      track,
      percentage: Math.round(
        (track.completedDays / track.duration) * 100
      ),
      remainingDays: track.duration - track.completedDays,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


// Update Track
async function updateTrack(req, res) {
  try {
    const track = await trackModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!track) {
      return res.status(404).json({
        message: "Track not found.",
      });
    }

    const { title, description, duration } = req.body;

    if (title !== undefined) track.title = title;
    if (description !== undefined) track.description = description;
    if (duration !== undefined) track.duration = duration;


    if (track.completedDays > track.duration) {
      track.completedDays = track.duration;
    }


    if (track.completedDays === 0) {
      track.status = "Not Started";
    } else if (track.completedDays < track.duration) {
      track.status = "In Progress";
    } else {
      track.status = "Completed";
    }


    await track.save();

    return res.status(200).json({
      message: "Track updated successfully.",
      track,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


// Daily Progress Update
async function updateDailyProgress(req, res) {
  try {

    const track = await trackModel.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });


    if (!track) {
      return res.status(404).json({
        message: "Track not found.",
      });
    }


    const todayString = new Date().toDateString();


    if (
      track.lastUpdated &&
      new Date(track.lastUpdated).toDateString() === todayString
    ) {
      return res.status(400).json({
        message: "You have already updated today's progress.",
      });
    }


    if (track.completedDays >= track.duration) {
      return res.status(400).json({
        message: "Track already completed.",
      });
    }



    // Update track progress

    track.completedDays += 1;
    track.lastUpdated = new Date();



    if (track.completedDays === 0) {
      track.status = "Not Started";
    } else if (track.completedDays < track.duration) {
      track.status = "In Progress";
    } else {
      track.status = "Completed";
    }





    // ==========================
    // Update User Streak
    // ==========================

    const user = await userModel.findById(req.user._id);


    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }



    const today = new Date();

    today.setHours(0, 0, 0, 0);



    if (!user.lastActivityDate) {

      user.streak = 1;

    } else {

      const lastDate = new Date(user.lastActivityDate);

      lastDate.setHours(0, 0, 0, 0);


      const diffDays = Math.floor(
        (today - lastDate) /
        (1000 * 60 * 60 * 24)
      );


      if (diffDays === 0) {

        // Already counted today

      } else if (diffDays === 1) {

        user.streak += 1;

      } else {

        user.streak = 1;

      }

    }



    user.lastActivityDate = new Date();



    if (user.streak > user.bestStreak) {
      user.bestStreak = user.streak;
    }



    // ==========================
    // Save Activity History
    // ==========================

    if (!user.activity) {
      user.activity = [];
    }


    const alreadyCompletedToday = user.activity.some(
      (item) =>
        new Date(item.date).toDateString() ===
        today.toDateString()
    );


    if (!alreadyCompletedToday) {

      user.activity.push({
        date: today,
      });

    }



    await track.save();

    await user.save();



    return res.status(200).json({

      message: "Progress updated successfully.",

      track,

      percentage: Math.round(
        (track.completedDays / track.duration) * 100
      ),

      remainingDays:
        track.duration - track.completedDays,

    });



  } catch (error) {

    console.error(error);


    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
}



// Delete Track
async function deleteTrack(req, res) {
  try {

    const track = await trackModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });


    if (!track) {
      return res.status(404).json({
        message: "Track not found.",
      });
    }


    return res.status(200).json({
      message: "Track deleted successfully.",
    });


  } catch (error) {

    console.error(error);


    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
}



module.exports = {
  createTrack,
  getAllTracks,
  getTrackById,
  updateTrack,
  updateDailyProgress,
  deleteTrack,
};