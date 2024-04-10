// routes/homepage.js

const express = require('express');
const router = express.Router();
const path = require('path');

// Define route for homepage
router.get('/homepage', (req, res) => {
  // Serve the homepage HTML file
  res.sendFile(path.join(__dirname, '..', 'public', 'homepage.html'));
});

module.exports = router;
