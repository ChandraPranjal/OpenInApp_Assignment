const { Task } = require("../models/task.model");
const { SubTask } = require("../models/subTask.model");
const { updateParentTaskStatus } = require("../utils/updateParentTaskStatus");

const createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;

    const task = await Task.findById(task_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const newSubTask = new SubTask({
      task_id: task_id,
    });

    const savedSubTask = await newSubTask.save();
    await updateParentTaskStatus(savedSubTask._id);

    res.status(201).json(savedSubTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSubTask = async (req, res) => {
  try {
    const { task_id, status } = req.query;

    const filter = {
        isDeleted:false,
    };
    if (task_id !== undefined) {
      filter.task_id = task_id;
    }
    if (status !== undefined) {
      filter.status = status;
    }

    const subtasks = await SubTask.find(filter);

    res.status(200).json(subtasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateSubTask = async (req, res) => {
  try {
    const { status } = req.body;
    const subtaskId = req.params.subtaskId;


    const subtask = await SubTask.findById(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    if (status !== undefined && (status === 0 || status === 1)) {
      subtask.status = status;
    } else {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedSubtask = await subtask.save();

    await updateParentTaskStatus(subtask.task_id);


    res.status(200).json(updatedSubtask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSubTask = async (req, res) => {
    try {
      const subtaskId = req.params.subtaskId;
  
      const subtask = await SubTask.findById(subtaskId);
      if (!subtask) {
        return res.status(404).json({ message: 'Subtask not found' });
      }
  
      subtask.isDeleted = true;
      subtask.deleted_at = new Date();
  
      const deletedSubtask = await subtask.save();
      await updateParentTaskStatus(subtaskId);
  
      res.status(200).json(deletedSubtask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

module.exports = { createSubTask, getSubTask , updateSubTask ,deleteSubTask};
