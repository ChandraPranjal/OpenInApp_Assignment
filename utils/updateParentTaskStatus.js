const { SubTask } = require("../models/subTask.model");
const { Task } = require("../models/task.model");

async function updateParentTaskStatus(taskId) {
  try {
    const subtasks = await SubTask.find({ task_id: taskId });

    let taskStatus = "TODO"; // Default status
    let completedTaskCount = 0;
    if (subtasks.length > 0) {
      subtasks.map((subtask) => {
        if (subtask.status === true) ++completedTaskCount;
      });

      if (completedTaskCount === subtasks.length) {
        taskStatus = "DONE";
      } else if (completedTaskCount > 0) {
        taskStatus = "IN_PROGRESS";
      }
    }

    await Task.findByIdAndUpdate(taskId, { status: taskStatus });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { updateParentTaskStatus };
