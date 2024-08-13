// User Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Authentication successful
            res.status(200).json({ message: 'Login successful' });
        });
    });
});

const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Create a JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        });
    });
});
