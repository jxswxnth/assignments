const { jwtSecret } = require("../routes/admin");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtSecretforUser = process.env.jwtSecretForUser;
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.split(' ').length == 2 && authHeader.split(' ')[0] == 'Bearer') {
        const token = authHeader.split(' ')[1];
        try {
            const payload = await jwt.verify(token, jwtSecretforUser);
            console.log("payload", payload);
            req.username = payload.username;
            next();
        } catch (err) {
            console.error('Error verifying token:', err);
            res.status(403).json({ msg: "invalid auth token or token expired", err: err.message });
        }
    } else {
        res.json({ msg: "authorization required to access this resourse" });
    }
}

module.exports = userMiddleware;