const mongoose = require("mongoose");
const { User } = require("./user.model");

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Corrected the type
      ref:User,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: Number,
      default:0,
      enum: [0, 1, 2, 3], // 0: Due date is today, 1: Due date is tomorrow, 2: Due date is in 3-4 days, 3: Due date is in 5+ days
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);


const Task = mongoose.model("Task", taskSchema);
module.exports = { Task };
