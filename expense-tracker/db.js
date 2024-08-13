// config/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost:3306',      // Database host (e.g., localhost)
    user: 'root',  // Your MySQL username
    password: 'Ernesto@24', // Your MySQL password
    database: 'expense_tracker'  // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;
