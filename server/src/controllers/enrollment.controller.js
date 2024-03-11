const Enrollment = require('../models/enrollment.model');

exports.selectCourses = async (req, res) => {
  try {
    const { courses } = req.body;
    const studentId = req.user.id; // Assuming you're using JWT authentication middleware to attach user information to the request

    // Check if the student has already selected courses
    const existingEnrollments = await Enrollment.find({ studentId });
    if (existingEnrollments.length > 0) {
      return res.status(400).json({ message: 'You have already selected courses' });
    }

    // Create an array of enrollment objects with the student ID and selected course IDs
    const enrollments = courses.map(courseId => ({ studentId, courseId }));

    // Insert the enrollment documents into the database
    await Enrollment.insertMany(enrollments);

    // Respond with a success message
    res.status(200).json({ message: 'Courses selected successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};
