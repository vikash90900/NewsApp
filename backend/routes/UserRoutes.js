const express = require("express");
const router = express.Router();
const { registerUser, getUsers, loginUser, getProfile } = require("../controllers/userController");
const auth = require('../middleware/authmiddleware');

router.post("/register", registerUser);
router.get("/", getUsers);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile);

module.exports = router;