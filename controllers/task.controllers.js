const { Task } = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (
      !title ||
      !description ||
      !dueDate ||
      priority === undefined ||
      !status
    ) {
      return res
        .status(400)
        .json({ error: "Title, description, and due_date are required" }); // handle it better
    }

    const user_id = req.user._id;

    const newTask = new Task({
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      status,
      userId : user_id,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTask = async (req, res) => {
  try {
    const { priority, dueDate, status, page = 1, limit = 10, id } = req.query;

    const filter = {
        isDeleted:false,
    };
    
    if (priority !== undefined) {
      filter.priority = priority;
    }
    if (dueDate !== undefined) {
      filter.dueDate = dueDate;
    }
    if (status !== undefined) {
      filter.status = status;
    }
    if (id !== undefined) {
      filter._id = id;
    }

    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter).skip(skip).limit(parseInt(limit));

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateTask = async (req, res) => {
  try {
    const { dueDate, status } = req.body;
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }

    if (status !== undefined) {
      task.status = status;
    }

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isDeleted = true;
    const deletedTask = await task.save();
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createTask, getTask, updateTask,deleteTask };
