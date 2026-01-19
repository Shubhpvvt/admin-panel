const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

/*
  CREATE USER (ROLE BASED)
  - Super Admin can create anyone
  - Gym Owner can create trainer & user
*/
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, gymId, specialization } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 AUTH ROLE (from JWT)
    const creatorRole = req.user.role;

    // ===== ROLE RULES (IDM) =====
    if (creatorRole === "superAdmin") {
      // can create anyone
    } else if (creatorRole === "gymOwner") {
      if (!["trainer", "user"].includes(role)) {
        return res.status(403).json({
          message: "Gym Owner can only create Trainer or User",
        });
      }
    } else {
      return res.status(403).json({
        message: "You are not allowed to create users",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role,
      gymId: gymId || null,
      specialization: specialization || "",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gymId: user.gymId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
