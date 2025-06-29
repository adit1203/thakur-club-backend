const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
}

router.post('/predict', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const colors = ['red', 'green', 'violet'];
  const result = colors[Math.floor(Math.random() * colors.length)];
  const win = result === req.body.color;
  if (win) user.balance += 10;
  else user.balance -= 10;
  await user.save();
  res.send({ message: win ? `You won! It was ${result}` : `You lost! It was ${result}` });
});

module.exports = router;