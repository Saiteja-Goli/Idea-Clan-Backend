const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", 
verifyToken,
 userController.logoutUser);
router.get("/profile", 
//verifyToken, 
userController.getProfile);

router.put("/profile", 
//verifyToken, 
userController.updateProfile);
router.post('/test', verifyToken, userController.test)

module.exports = router;