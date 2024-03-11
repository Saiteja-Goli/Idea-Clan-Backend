const Enrollment = require('../models/enrollment.model');

exports.selectCourses = async (req, res) => {
  try {
    const { courses } = req.body;
    const studentId = req.user.id;
    const existingEnrollments = await Enrollment.find({ studentId });
    if (existingEnrollments.length > 0) {
      return res.status(400).json({ message: 'You have already selected courses' });
    }
    const enrollments = courses.map(courseId => ({ studentId, courseId }));
    await Enrollment.insertMany(enrollments);

    res.status(200).json({ message: 'Courses selected successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
