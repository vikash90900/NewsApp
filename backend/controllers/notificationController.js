const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  const userId = req.params.userId;

  const notifications = await Notification.find({ user_id: userId })
    .sort({ timestamp: -1 });

  res.json(notifications);
};