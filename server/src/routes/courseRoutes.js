const express = require('express');
const router = express.Router();
const courseController = require("../controllers/course.controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/courses", verifyToken, courseController.getAllCourse);
router.post("/courses", verifyToken, courseController.createCourse);
router.delete("/courses/:id", verifyToken, courseController.deleteCourse);

module.exports = router;
