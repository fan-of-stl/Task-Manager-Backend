const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const authMiddleware = require("../middleware/authenticationMiddleware");

router.post(
  "/create",
  authMiddleware.isAuthenticated,
  taskController.createTask
);
router.put("/update/:id", taskController.updateTask);
router.get("/all", authMiddleware.isAuthenticated, taskController.getAlltasks);

module.exports = router;
