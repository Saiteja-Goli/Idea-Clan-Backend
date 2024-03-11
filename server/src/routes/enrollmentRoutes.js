const express = require('express');
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");
const verifyToken = require("../middleware/verifyToken");

router.post('/select-courses', enrollmentController.selectCourses);

module.exports = router;
