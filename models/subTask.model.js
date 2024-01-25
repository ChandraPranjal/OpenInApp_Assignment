const mongoose = require("mongoose");
const { Task } = require("./task.model");
const subTaskSchema = mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Task,
    required:true
  },
  status:{
    type:Boolean,
    default:0
  },
  deleted_at:{
    type:Date,
    default:null
  },
  isDeleted:{
    type:Boolean,
    default:false
  }

},{timestamps : true});


const SubTask = mongoose.model("SubTask",subTaskSchema);

module.exports = {SubTask}