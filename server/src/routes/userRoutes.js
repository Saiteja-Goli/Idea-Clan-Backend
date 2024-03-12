const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/profile",verifyToken, userController.getProfile);

module.exports = router;