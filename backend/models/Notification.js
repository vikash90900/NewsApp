const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  message: String,
  status: { type: String, default: "unread" },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);