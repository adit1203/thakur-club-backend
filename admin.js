const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simple admin auth middleware
const ADMIN_EMAIL = 'admin@thakur.com';
const ADMIN_PASSWORD = 'admin123';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET);
    res.send({ token });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

function adminAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.admin) return res.sendStatus(403);
  next();
}

// Admin routes
router.get('/users', adminAuth, async (req, res) => {
  const users = await User.find({}, 'email balance');
  res.send(users);
});

module.exports = router;