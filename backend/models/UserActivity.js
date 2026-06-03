const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user_id: String,
  news_id: String,
  time_spent: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserActivity", activitySchema);