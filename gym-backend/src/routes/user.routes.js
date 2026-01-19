const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Super Admin / Gym Owner → Create User
router.post("/", protect, createUser);

module.exports = router;
