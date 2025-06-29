const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./auth');
const walletRoutes = require('./wallet');
const gameRoutes = require('./game');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);
app.use('/game', gameRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));
const adminRoutes = require('./admin');
app.use('/admin', adminRoutes);