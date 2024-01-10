// Middleware for handling auth
const { Admin } = require("../db/index");
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    if (req.headers?.username && req.headers?.password) {
        const { username, password } = req.headers;
        const [admin] = await Admin.find({ username });
        if (admin?.password == password) {
            req.admin = admin;
            next();
        } else {
            res.json({ message: "Invalid Admin Credentials" });
        }
    } else {
        res.json({ msg: "username and password required" });
    }

}

module.exports = adminMiddleware;