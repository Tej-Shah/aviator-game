const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash });
    res.status(201).json({ msg: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
};

const login = async (req, res) => {
  console.log("login attempt")
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, username: user.username, balance: user.balance });
};

module.exports = { register, login };
