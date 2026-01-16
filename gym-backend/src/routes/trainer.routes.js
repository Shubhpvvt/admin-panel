const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User.model");

/* ================= GET ALL TRAINERS ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trainers = await User.find({ role: "trainer" }).select("-password");
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= ADD TRAINER ================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, specialization, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name & Email required" });
    }

    // 🔐 default password
    const hashedPassword = await bcrypt.hash("trainer123", 10);

    const trainer = await User.create({
      name,
      email,
      password: hashedPassword,   // 🔥 REQUIRED
      specialization,
      status,
      role: "trainer",
    });

    res.json({
      trainer: {
        _id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        specialization: trainer.specialization,
        status: trainer.status,
        role: trainer.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE TRAINER ================= */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const trainer = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ trainer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE TRAINER ================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Trainer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
