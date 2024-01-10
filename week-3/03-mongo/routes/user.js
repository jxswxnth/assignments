const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const { username, password } = req.headers;
        const user = new User({ username, password });
        await user.save();
        res.json({ message: 'User created successfully' });
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find({});
        res.json({ courses: courses });
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const courseId = req.params.courseId;
        try {
            await User.findOneAndUpdate({ username: req.user.username }, {
                $addToSet: {
                    courses: courseId
                }
            })
        } catch (err) {
            throw new Error(`Course Already Purchased, ${err}`)
        }
    } catch (err) {
        throw new Error(`Course does not exist ${err}`);
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try {
        const courseIds = req.user.courses;
        const courses = await Course.find({
            courseId: {
                $in: courseIds
            }
        });
        res.json({ purchasedCourses: courses });
    } catch (err) {
        throw new Error(err);
    }
});

router.use((req, res) => {
    res.json({ msg: "Invalid route" });
})

module.exports = router;