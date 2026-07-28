const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    streak: {
  type: Number,
  default: 0,
},

bestStreak: {
  type: Number,
  default: 0,
},

lastActivityDate: {
  type: Date,
  default: null,
},

})

const userModel = mongoose.model("user",userSchema);
module.exports= userModel;