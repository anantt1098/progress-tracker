const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        trackId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        day: {
            type: Number,
            required: true
        },

        hoursStudied: {
            type: Number,
            required: true,
            min: 0
        },

        notes: {
            type: String,
            trim: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const progressModel = mongoose.model("Progress", progressSchema);

module.exports = progressModel;