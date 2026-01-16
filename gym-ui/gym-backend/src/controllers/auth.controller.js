const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create admin (one time)
exports.createAdmin = async (req, res) => {
  const hash = await bcrypt.hash('admin123', 10);

  const user = await User.create({
    name: 'Admin',
    email: 'admin@gym.com',
    password: hash,
    role: 'superAdmin'
  });

  res.json(user);
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, user });
};
