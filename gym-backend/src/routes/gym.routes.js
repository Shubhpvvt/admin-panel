const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const Gym = require("../models/Gym.model");

// GET ALL GYMS
router.get("/", authMiddleware, async (req, res) => {
  const gyms = await Gym.find();
  res.json(gyms);
});

// ADD GYM
router.post("/", authMiddleware, async (req, res) => {
  const gym = await Gym.create(req.body);
  res.json({ gym });
});

// UPDATE GYM
router.put("/:id", authMiddleware, async (req, res) => {
  const gym = await Gym.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ gym });
});

// DELETE GYM
router.delete("/:id", authMiddleware, async (req, res) => {
  await Gym.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
