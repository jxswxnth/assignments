// Middleware for handling auth
const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwtSecretForAdmin = process.env.jwtSecretForAdmin;
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.split(' ').length == 2 && authHeader.split(' ')[0] == 'Bearer') {
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, jwtSecretForAdmin);
            next();
        } catch (err) {
            console.log(err);
            res.status(403).json({ msg: "invalid auth token or token expired" });
        }
    } else {
        res.json({ msg: "authorization required to access this resourse" });
    }
}

module.exports = adminMiddleware;