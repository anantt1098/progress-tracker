const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Total number of days required to complete the goal
    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    // Number of completed days
    completedDays: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Last day the user updated progress
    lastUpdated: {
      type: Date,
      default: null,
    },

    

    // Goal status
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },

    // Goal owner
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual: completion percentage
trackSchema.virtual("percentage").get(function () {
  if (!this.duration) return 0;

  return Math.round(
    (this.completedDays / this.duration) * 100
  );
});

// Virtual: remaining days
trackSchema.virtual("remainingDays").get(function () {
  return Math.max(0, this.duration - this.completedDays);
});

// Include virtuals in JSON responses
trackSchema.set("toJSON", {
  virtuals: true,
});

trackSchema.set("toObject", {
  virtuals: true,
});

module.exports = mongoose.model("Track", trackSchema);