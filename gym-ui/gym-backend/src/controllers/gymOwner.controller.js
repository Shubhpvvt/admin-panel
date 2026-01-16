const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// GET all gym owners
exports.getGymOwners = async (req, res) => {
  const owners = await User.find({ role: "gymOwner" }).select("-password");
  res.json(owners);
};

// ADD gym owner
exports.createGymOwner = async (req, res) => {
  const { name, email, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // 🔑 AUTO PASSWORD (IMPORTANT FIX)
  const hashedPassword = await bcrypt.hash("gymowner123", 10);

  const owner = await User.create({
    name,
    email,
    password: hashedPassword, // ✅ REQUIRED FIELD FIXED
    role: "gymOwner",
    status: status || "Active",
  });

  res.status(201).json({
    owner: {
      _id: owner._id,
      name: owner.name,
      email: owner.email,
      status: owner.status,
    },
  });
};

// UPDATE gym owner
exports.updateGymOwner = async (req, res) => {
  const owner = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password");

  res.json({ owner });
};

// DELETE gym owner
exports.deleteGymOwner = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Gym owner deleted" });
};
