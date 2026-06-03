const UserActivity = require("../models/UserActivity");

exports.trackActivity = async (req, res) => {
  try {
    const activity = new UserActivity(req.body);
    await activity.save();

    res.json({ message: "Activity tracked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};