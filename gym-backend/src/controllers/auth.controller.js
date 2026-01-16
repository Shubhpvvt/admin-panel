const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= CREATE ADMIN =================
exports.createAdmin = async (req, res) => {
  try {
    const email = "admin@gmail.com";
    const password = "admin123";

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name: "Super Admin",
      email,
      password: hash,
      role: "superAdmin"
    });

    res.json({
      message: "Admin created",
      email,
      password
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN (FIXED FOR VERCEL + RENDER) =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    // 🔥 IMPORTANT FIX (COOKIE FOR PRODUCTION)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        // REQUIRED for HTTPS (Vercel + Render)
      sameSite: "None",    // REQUIRED for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
