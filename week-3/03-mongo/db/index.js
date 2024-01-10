const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin-jxswxnth:tSD46jLIA429gE8K@cluster0.otvpdjb.mongodb.net/coursesDB');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    courses: [String],
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    courses: [String],
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    courseId: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}