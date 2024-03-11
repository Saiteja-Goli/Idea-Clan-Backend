const express = require('express');
const router = express.Router();
const lectureController = require("../controllers/lecture.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/lectures", verifyToken, lectureController.getLectures);
router.post("/courses/:courseId/lectures", verifyToken, lectureController.createLecture);
router.get("/courses/:courseId/lectures", verifyToken, lectureController.getLecturesByCourse);
router.delete("/lectures/:lectureId", verifyToken, lectureController.deleteLecture);

router.get("/lectures/:lectureId/discussions", verifyToken, lectureController.getDiscussion);
router.get("/analytics", verifyToken, lectureController.getAnalytics);
router.get("/students", verifyToken, lectureController.getStudents);
router.get("/courses/:courseId/lectures", verifyToken, lectureController.getLecturesByCourse);

module.exports = router;
