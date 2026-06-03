const express = require("express");
const router = express.Router();
const { trackActivity } = require("../controllers/activityController");

router.post("/", trackActivity);

module.exports = router;