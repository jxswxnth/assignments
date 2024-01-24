const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const adminRouter = Router();
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwtSecretForAdmin = process.env.jwtSecretForAdmin;

// Admin Routes
adminRouter.post('/signup', async (req, res) => {
    // Implement admin signup logic
    if (req.body?.username && req.body?.password) {
        const { username, password } = req.body;
        try {
            const admin = new Admin({ username, password });
            await admin.save();
            res.json({ message: 'Admin created successfully' });
        } catch (err) {
            throw new Error(err);
        }
    } else {
        res.status(403).json({ msg: "username and password required" });
    }
});

adminRouter.post('/signin', async (req, res) => {
    // Implement admin signin logic
    if (req.body?.username && req.body?.password) {
        const { username, password } = req.body;
        const [admin] = await Admin.find({ username, password });
        if (admin) {
            try {
                const token = jwt.sign({ username }, jwtSecretForAdmin, { expiresIn: '1h' });
                res.json({ token: token });
            } catch (err) {
                throw new Error(err);
            }
        } else {
            res.status(403).json({ msg: "Invalid Admin Credentials or SignUp required" });
        }
    } else {
        res.status(403).json({ msg: "username and password required" });
    }
});

adminRouter.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        const { title, description, price, imageLink } = req.body;
        const course = new Course({ title, description, price, imageLink, published: true });
        await course.save();
        res.json({ message: 'Course created successfully', courseId: course._id })
    } catch (err) {
        throw new Error(err);
    }
});

adminRouter.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.json({ courses: courses });
    } catch (err) {
        throw new Error(err);
    }
});

adminRouter.use((req, res) => {
    res.status(404).json({ msg: "invalid route" })
})

module.exports = {
    adminRouter
};