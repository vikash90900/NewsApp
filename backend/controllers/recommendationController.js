const UserActivity = require("../models/UserActivity");
const News = require("../models/News");

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Step 1: Get user activity
    const activities = await UserActivity.find({ user_id: userId });

    if (activities.length === 0) {
      return res.json({ message: "No activity yet" });
    }

    // Step 2: Count categories
    const categoryCount = {};

    for (let activity of activities) {
      const news = await News.findById(activity.news_id);

      if (news && news.category) {
        categoryCount[news.category] =
          (categoryCount[news.category] || 0) + 1;
      }
    }

    // Step 3: Find top category
    const topCategory = Object.keys(categoryCount).reduce((a, b) =>
      categoryCount[a] > categoryCount[b] ? a : b
    );

    // Step 4: Fetch recommended news
    const recommendedNews = await News.find({
      category: topCategory,
    }).limit(10);

    res.json({
      topCategory,
      recommendedNews,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};