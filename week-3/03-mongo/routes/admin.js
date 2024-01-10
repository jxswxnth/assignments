const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.headers;
    try {
        const admin = new Admin({ username, password });
        await admin.save();
        res.json({ message: 'Admin created successfully' });
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        const { title, description, price, imageLink } = req.body;
        const course = new Course({ courseId: Date.now(), title, description, price, imageLink, published: true });
        await course.save();
        await Admin.findOneAndUpdate({ username: req.admin.username }, {
            $addToSet: {
                courses: course.courseId
            }
        })
        res.json({ message: 'Course created successfully', courseId: course.courseId })
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courseIds = req.admin.courses;
        const courses = await Course.find({
            courseId: {
                $in: courseIds
            }
        });
        res.json({ courses: courses });
    } catch (err) {
        throw new Error(err);
    }
});

router.use((req, res) => {
    res.json({ msg: "Invalid route" });
})

module.exports = router;