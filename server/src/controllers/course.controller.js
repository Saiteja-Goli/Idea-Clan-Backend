const Course = require('../models/course.model');
const Lecture = require('../models/lecture.model');

exports.createCourse = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const { name, description, prerequisites } = req.body;
    const course = new Course({
      name,
      description,
      prerequisites
    });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
   
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const { id } = req.params;
    const { name, description, prerequisites } = req.body;
    const course = await Course.findByIdAndUpdate(id, { name, description, prerequisites }, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await Lecture.deleteMany({ courseId: id });

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      if (req.user.role === 'student') {
        const enrolledCourses = req.user.enrolledCourses.map(course => course.toString());
        if (!enrolledCourses.includes(id)) {
          return res.status(403).json({ message: 'Permission denied' });
        }
      }
  
      res.status(200).json({ course });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllCourse = async (req, res) => {

  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
