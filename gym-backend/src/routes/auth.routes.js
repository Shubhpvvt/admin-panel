const express = require("express");
const router = express.Router();

const {
  login,
  createAdmin
} = require("../controllers/auth.controller");

router.get("/create-admin", createAdmin);
router.post("/login", login);

module.exports = router;
