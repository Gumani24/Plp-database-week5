// authMiddleware.js
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for session management

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Add user info to request object
        next();
    });
};

module.exports = authenticate;
