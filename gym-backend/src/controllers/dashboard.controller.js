const User = require('../models/User.model');

exports.getDashboardData = async (req, res) => {
  const role = req.user.role;

  if (role === "superAdmin") {
    const totalUsers = await User.countDocuments();
    const totalTrainers = await User.countDocuments({ role: "trainer" });

    return res.json({
      role,
      totalUsers,
      totalTrainers
    });
  }

  res.json({
    role,
    message: "Dashboard data"
  });
};