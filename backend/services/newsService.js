const axios = require("axios");
const News = require("../models/News");

exports.fetchAndStoreNews = async () => {
  const response = await axios.get(
    `https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&country=in`
  );

  const articles = response.data.results || [];
  console.log(articles[0]);
  console.log("Articles received:", articles.length);

  const savedArticles = [];
  

for (const article of articles) {

const newsData = {
  title: article.title,
  description: article.description,
  source: article.source_name,
  category: article.category?.[0] || "general",
  location: article.country?.[0] || "india",
  image_url: article.image_url,
  url: article.link,
  published_date: article.pubDate,
  author: article.creator?.[0] || "Unknown",
  content: article.content || ""
};

  const news = await News.findOneAndUpdate(
    { url: article.url },  // filter
    newsData,              // update data
    {
      upsert: true,
      new: true
    }
  );
  console.log("Saving:", article.title);

  savedArticles.push(news);
}
console.log(response.data);
console.log("Saved:", savedArticles.length);

  return savedArticles;
};