const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authenticationMiddleware");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile", userController.getUserProfile);

router.post("/logout", authMiddleware.isAuthenticated, userController.logout);

module.exports = router;
