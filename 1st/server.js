// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connect } = require('./db');
const User = require('./models/User'); // Import User model

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/registrationDB';

// Connect to MongoDB
connect(mongoURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Register and login routes
app.use('/register', require('./routes/register.js'));
app.use('/login', require('./routes/login.js'));

// Add the homepage route
// server.js

// Add the homepage route
app.use('/', require('./routes/homepage.js'));


// View data route
app.get('/viewdata', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Error fetching user data');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
