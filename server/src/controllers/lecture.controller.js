const Course = require('../models/course.model');
const Lecture = require('../models/lecture.model');
const User = require('../models/user.model');
const Discussion = require('../models/discussion.model');

exports.getLectures = async (req, res) => {
    try {
      const studentId = req.user.id;

      const lectures = await Lecture.find({ courseId: { $in: req.user.enrolledCourses } });
  
      res.status(200).json({ lectures });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

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
      await lecture.save();
      res.status(201).json({ message: 'Lecture scheduled successfully', lecture });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.getAnalytics = async (req, res) => {
    try {
      const totalStudents = await User.countDocuments({ role: 'student' });
      const totalCourses = await Course.countDocuments();
      const totalLectures = await Lecture.countDocuments();
      res.status(200).json({ totalStudents, totalCourses, totalLectures });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getStudents = async (req, res) => {
    try {
      const students = await User.find({ role: 'student' });
      res.status(200).json({ students });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.getLecturesByCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const lectures = await Lecture.find({ courseId });
      res.status(200).json({ lectures });
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