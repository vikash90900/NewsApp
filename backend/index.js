// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const newsRoutes = require('./routes/newsRoutes');
const activityRoutes = require('./routes/activityRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
// Connect to MongoDB
connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/notifications', notificationRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});



// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});