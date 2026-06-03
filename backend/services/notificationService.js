const User = require("../models/User");
const Notification = require("../models/Notification");

exports.notifyUsers = async (articleTitle) => {
  const users = await User.find();

  for (const user of users) {
    if (user.preferences.includes("general")) {
      await Notification.create({
        user_id: user._id,
        title: "New News Available",
        message: articleTitle
      });
    }
  }
};