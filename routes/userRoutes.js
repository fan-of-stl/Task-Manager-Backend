const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const passport = require("passport");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile", userController.getUserProfile);

module.exports = router;
