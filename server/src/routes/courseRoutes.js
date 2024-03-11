const express = require('express');
const router = express.Router();
const courseController = require("../controllers/course.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/courses", 
verifyToken, 
courseController.createCourse);
router.put("/courses/:id", 
//verifyToken, 
courseController.updateCourse);
router.delete("/courses/:id",// verifyToken,
 courseController.deleteCourse);
router.get("/courses/:id", //verifyToken, 
courseController.getCourse);
router.get("/courses", //verifyToken, 
courseController.getAllCourse);

module.exports = router;
