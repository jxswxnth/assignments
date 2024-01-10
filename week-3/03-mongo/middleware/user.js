const { User } = require("../db/index");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    if (req.headers?.username && req.headers?.password) {
        res.json({ msg: "username and password required" });
    }
    const { username, password } = req.headers;
    const [user] = await User.find({ username });
    if (user?.password == password) {
        req.user = user;
        next();
    } else {
        res.json({ message: "Invalid User Credentials" });
    }
}

module.exports = userMiddleware;