const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["superAdmin", "gymOwner", "trainer", "user"],
      required: true,
    },

    specialization: {
      type: String,
      default: "",     // 🔥 IMPORTANT
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active", // 🔥 IMPORTANT
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
