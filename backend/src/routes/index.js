// src/routes/index.js
const express = require('express');
const router = express.Router();

// Import routes
const userRoutes = require('./users.routes');
const messageRoutes = require('./messages.routes');

// Use routes
router.use('/users', userRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
