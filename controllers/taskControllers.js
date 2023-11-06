const Task = require("../models/task");

exports.createTask = async (req, res) => {
  const { name, description, dueDate, priority, tags } = req.body;

  const creator = req.user._id;

  console.log(creator._id);

  try {
    const newTask = new Task({
      name,
      description,
      dueDate,
      priority,
      tags,
      creator,
      completed: false,
    });

    const savedTask = await newTask.save();

    res
      .status(200)
      .json({ message: "task created successfully", task: savedTask });
  } catch (err) {
    return res.status(400).json({ error: "task creation failed!" });
  }
};

exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const updateData = req.body;

  Task.findByIdAndUpdate(
    taskId,
    updateData,
    { new: true },
    (err, updatedtask) => {
      if (err) {
        return res.status(400).json({ error: "task updated failed!" });
      }

      res
        .status(200)
        .json({ message: "task updated successfully" }, updatedtask);
    }
  );
};

exports.getAlltasks = async (req, res) => {
  try {
    const tasks = await Task.find({ creator: req.user._id }).exec();
    console.log("task data :", tasks);
    res.status(200).json({ tasks });
  } catch (error) {
    return res.status(400).json({ error: "Task retrieval failed" });
  }
};
