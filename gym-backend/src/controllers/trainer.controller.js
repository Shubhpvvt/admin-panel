const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// GET trainers
exports.getTrainers = async (req, res) => {
  const trainers = await User.find({ role: "trainer" }).select("-password");
  res.json(trainers);
};

// ADD trainer
exports.createTrainer = async (req, res) => {
  const { name, email, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash("trainer123", 10);

  const trainer = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "trainer",
    status: status || "Active",
  });

  res.status(201).json({
    trainer: {
      _id: trainer._id,
      name: trainer.name,
      email: trainer.email,
      status: trainer.status,
    },
  });
};

// UPDATE trainer
exports.updateTrainer = async (req, res) => {
  const trainer = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json({ trainer });
};

// DELETE trainer
exports.deleteTrainer = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Trainer deleted" });
};