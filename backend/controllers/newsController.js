const newsService = require("../services/newsService");
const notificationService = require("../services/notificationService");
const News = require("../models/News");

exports.fetchNews = async (req, res) => {
  try {
    const articles = await newsService.fetchAndStoreNews();

    for (const article of articles) {
      await notificationService.notifyUsers(article.title);
    }

    res.json({
      message: "News fetched and stored"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}; 

exports.getNews = async (req, res) => {
  try {
    const { category, location } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (location) {
      filter.location = location;
    }

    const news = await News.find(filter)
      .sort({ createdAt: -1 });

    res.json(news);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};