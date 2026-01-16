const User = require("../models/User.model");

exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const { role, status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role, status },
    { new: true }
  ).select("-password");

  res.json({ user });
};
