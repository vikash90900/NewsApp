const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/UserRoutes");
const newsRoutes = require("./routes/newsRoutes");
const activityRoutes = require("./routes/activityRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/notifications", notificationRoutes);

// Basic test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

module.exports = app;