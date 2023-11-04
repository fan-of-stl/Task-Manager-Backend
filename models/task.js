const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  tags: [String],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
