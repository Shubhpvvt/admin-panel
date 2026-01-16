const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User.model");

const router = express.Router();

// 🔐 PROTECTED DASHBOARD
router.get("/", authMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalTrainers = await User.countDocuments({ role: "trainer" });
    const totalGymOwners = await User.countDocuments({ role: "gymOwner" });

    res.json({
      stats: {
        totalUsers,
        totalTrainers,
        totalGymOwners,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
