// login.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Handle login POST request
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Please enter a valid email.').trim(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long.')
      .trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      console.log('Finding user...');
      const user = await User.findOne({ email });

      if (!user) {
        console.log('No user found.');
        return res.status(404).json({ error: 'No account associated with this email.' });
      }

      console.log('Comparing passwords...');
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.log('Incorrect password.');
        // Return generic error message for incorrect password
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      console.log('Redirecting to homepage...');
      // Redirect to homepage with success message
      res.status(200).redirect('/homepage?message=Login%20successful!');

    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'An error occurred during login.' });
    }
  },
);

module.exports = router;
