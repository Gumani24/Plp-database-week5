const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./config/db'); // Assuming you have configured your MySQL connection in this file
const authenticate = require('./authMiddleware');

const app = express();
app.use(bodyParser.json());

// User Registration Route
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        // Insert the new user into the database
        const sql = 'INSERT INTO Users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Listen on a port (e.g., 3000)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const app = express();
app.use(bodyParser.json());

// Add Expense Route
app.post('/add-expense', authenticate, (req, res) => {
    const { amount, date, category } = req.body;
    const userId = req.user.id; // Extract user ID from the decoded JWT payload

    // Validate input
    if (!amount || !date || !category) {
        return res.status(400).json({ message: 'Amount, date, and category are required' });
    }

    // Insert new expense into the database
    const sql = 'INSERT INTO Expenses (user_id, amount, date, category) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, amount, date, category], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding expense' });
        }
        res.status(201).json({ message: 'Expense added successfully' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// View Expenses Route
app.get('/view-expenses', authenticate, (req, res) => {
    const userId = req.user.id; // Extract user ID from the decoded JWT payload

    // Fetch expenses for the authenticated user
    const sql = 'SELECT * FROM Expenses WHERE user_id = ? ORDER BY date DESC';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching expenses' });
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
