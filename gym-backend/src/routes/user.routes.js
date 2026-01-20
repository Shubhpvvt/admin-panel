const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  getUsers,
  createUser,
} = require("../controllers/user.controller");

// DEBUG LINE (IMPORTANT – remove later)
console.log("getUsers:", getUsers);

// ===== ROUTES =====
router.get("/", authMiddleware, getUsers);
router.post("/", authMiddleware, createUser);

module.exports = router;
