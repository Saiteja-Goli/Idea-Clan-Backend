const express = require('express');
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/enrollments", //verifyToken, 
enrollmentController.selectCourses);

module.exports = router;
