const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

/* ================= GET ALL GYM OWNERS ================= */
exports.getGymOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: "gymOwner" }).select("-password");
    res.json(owners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE GYM OWNER (CUSTOM PASSWORD) ================= */
exports.createGymOwner = async (req, res) => {
  try {
    // 🔴 IMPORTANT: log body to verify Render request
    console.log("CREATE GYM OWNER BODY:", req.body);

    const { name, email, password, status } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email and Password required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const owner = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "gymOwner",
      status: status || "Active",
    });

    console.log("OWNER CREATED IN DB:", owner.email);

    res.status(201).json({
      owner: {
        _id: owner._id,
        name: owner.name,
        email: owner.email,
        role: owner.role,
        status: owner.status,
      },
    });
  } catch (err) {
    console.error("CREATE OWNER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE GYM OWNER ================= */
exports.updateGymOwner = async (req, res) => {
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
};

/* ================= DELETE GYM OWNER ================= */
exports.deleteGymOwner = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Gym owner deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
