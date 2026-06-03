const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  source: String,
  location: String,
  image_url: String,
  published_date: Date,
  url: {type: String, unique: true},
  author: String,
  content: String,
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);