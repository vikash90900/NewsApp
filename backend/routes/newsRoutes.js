const express = require("express");
const router = express.Router();
const { fetchNews, getNews } = require("../controllers/newsController");
const auth = require('../middleware/authMiddleware');

router.get("/fetch", auth, fetchNews);
router.get("/",auth, getNews);

module.exports = router;
