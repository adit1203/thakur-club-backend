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

router.post('/deposit', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  user.balance += req.body.amount;
  await user.save();
  res.send({ balance: user.balance });
});

router.post('/withdraw', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (user.balance < req.body.amount)
    return res.status(400).send({ message: 'Insufficient funds' });
  user.balance -= req.body.amount;
  await user.save();
  res.send({ balance: user.balance });
});

router.get('/balance', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.send({ balance: user.balance });
});

module.exports = router;