const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  getGymOwners,
  createGymOwner,
  updateGymOwner,
  deleteGymOwner,
} = require("../controllers/gymOwner.controller");

// 🔐 ONLY AUTHENTICATED ADMIN
router.get("/", authMiddleware, getGymOwners);
router.post("/", authMiddleware, createGymOwner);
router.put("/:id", authMiddleware, updateGymOwner);
router.delete("/:id", authMiddleware, deleteGymOwner);

module.exports = router;
