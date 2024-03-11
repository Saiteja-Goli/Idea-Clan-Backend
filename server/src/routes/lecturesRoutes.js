const express = require('express');
const router = express.Router();
const lectureController = require("../controllers/lecture.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/lectures", //verifyToken, 
lectureController.getLectures);
router.get("/lectures/:lectureId/discussions", //verifyToken, 
lectureController.getDiscussion);
router.post("/courses/:courseId/lectures",// verifyToken,
 lectureController.createLecture);
router.get("/analytics",//verifyToken, 
lectureController.getAnalytics);
router.get("/students", //verifyToken,
 lectureController.getStudents);
router.get("/courses/:courseId/lectures", //verifyToken,
 lectureController.getLecturesByCourse);

module.exports = router;
