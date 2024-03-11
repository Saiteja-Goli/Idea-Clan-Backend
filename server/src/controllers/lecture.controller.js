const Course = require('../models/course.model');
const Lecture = require('../models/lecture.model');
const User = require('../models/user.model');
const Discussion = require('../models/discussion.model');

//fetching All Lectures
exports.getLectures = async (req, res) => {
  console.log("Entering to Get Lectures");
  try {
    // Fetch all lectures
    const lectures = await Lecture.find();
    // Send fetched lectures as response
    res.status(200).json({ lectures });
  } catch (error) {
    // Handle errors
    console.error("Error fetching lectures:", error);
    res.status(500).json({ error: error.message });
  }
};

//Creating Lecture
exports.createLecture = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }
    const { courseId } = req.params;
    const { title, startTime, endTime, description, meetingLink } = req.body;
    const lecture = new Lecture({
      courseId,
      title,
      startTime,
      endTime,
      description,
      meetingLink
    });
    console.log('New Lecture:', lecture); // Log the new lecture object
    await lecture.save();
    res.status(201).json({ message: 'Lecture scheduled successfully', lecture });
  } catch (error) {
    console.error('Error creating lecture:', error.message); // Log any errors
    res.status(500).json({ error: error.message });
  }
};

//get lectures by course ID
exports.getLecturesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lectures = await Lecture.find({ courseId });
    res.status(200).json({ lectures });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete a lecture
exports.deleteLecture = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const { lectureId } = req.params;
    // Delete the lecture from the database
    await Lecture.findByIdAndDelete(lectureId);
    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole === 'admin') {
      // Fetch all students and their details
      const students = await User.find({ role: 'student' }).select('name email');

      // Fetch all courses and their details
      const courses = await Course.find().select('name description');

      // You can add more data as needed

      res.status(200).json({ students, courses });
    } else {
      // Return regular analytics data for non-admin users
      const totalStudents = await User.countDocuments({ role: 'student' });
      const totalCourses = await Course.countDocuments();
      const totalLectures = await Lecture.countDocuments();

      const analyticsData = {
        totalStudents,
        totalCourses,
        totalLectures
      };

      res.status(200).json(analyticsData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}


exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussion = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const discussions = await Discussion.find({ lectureId });

    res.status(200).json({ discussions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};