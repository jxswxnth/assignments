const { Router } = require("express");
const userRouter = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtSecretforUser = process.env.jwtSecretForUser;


// User Routes
userRouter.post('/signup', async (req, res) => {
    // Implement user signup logic
    if (req.body?.username && req.body?.password) {
        const { username, password } = req.body;
        try {
            const user = new User({ username, password });
            await user.save();
            res.json({ message: 'User created successfully' });
        } catch (err) {
            throw new Error(err);
        }
    } else {
        res.status(403).json({ msg: "username and password required" });
    }
});

userRouter.post('/signin', async (req, res) => {
    // Implement user signup logic
    if (req.body?.username && req.body?.password) {
        const { username, password } = req.body;
        const [user] = await User.find({ username, password });
        if (user) {
            try {
                const token = jwt.sign({ username }, jwtSecretforUser, { expiresIn: '1h' });
                res.json({ token: token });
            } catch (err) {
                throw new Error(err);
            }
        } else {
            res.status(403).json({ msg: "Invalid user Credentials or SignUp required" });
        }
    } else {
        res.status(403).json({ msg: "username and password required" });
    }
});

userRouter.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        res.json({ courses: courses });
    } catch (err) {
        throw new Error(err);
    }
});

userRouter.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const courseExists = await Course.exists({ _id: courseId });
        if (!courseExists) {
            return res.status(404).json({ msg: "Course does not exist" });
        }

        const user = await User.findOne({ username: req.username });
        if (user.purchasedCourses && user.purchasedCourses.includes(courseId)) {
            return res.status(400).json({ msg: "Course already purchased" });
        }

        try {
            await User.findOneAndUpdate(
                { username: req.username },
                {
                    $addToSet: {
                        purchasedCourses: courseId
                    }
                }
            );
            res.status(200).json({ msg: "Course purchased successfully" });
        } catch (err) {
            console.error("Error updating user's courses:", err);
            return res.status(500).json({ msg: "Internal server error" });
        }

    } catch (err) {
        console.error("Error in course purchase logic:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});




userRouter.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = await User.findOne({ username: req.username });
        const courseIds = user.purchasedCourses;
        const courses = await Course.find({
            _id: {
                $in: courseIds
            }
        });
        res.json({ purchasedCourses: courses });
    } catch (err) {
        throw new Error(err);
    }
});

userRouter.use((req, res) => {
    res.status(404).json({ msg: "invalid route" })
})

module.exports = {
    userRouter
}