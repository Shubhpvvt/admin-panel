const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User.model");

/* ================= GET ALL GYM OWNERS ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const owners = await User.find({ role: "gymOwner" }).select("-password");
    res.json(owners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= ADD GYM OWNER ================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name & Email required" });
    }

    // 🔐 default password
    const hashedPassword = await bcrypt.hash("owner123", 10);

    const owner = await User.create({
      name,
      email,
      password: hashedPassword,   // 🔥 REQUIRED
      status,
      role: "gymOwner",
    });

    res.json({
      owner: {
        _id: owner._id,
        name: owner.name,
        email: owner.email,
        status: owner.status,
        role: owner.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE GYM OWNER ================= */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const owner = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ owner });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE GYM OWNER ================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Gym owner deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
