const express = require('express')


const taskRouter = express.Router()

const {verifyJWT} = require('../middlewares/auth.middleware')

const {createTask, getTask, updateTask, deleteTask} = require('../controllers/task.controllers')

taskRouter.route('/tasks').post(verifyJWT , createTask)
taskRouter.route('/tasks').get(verifyJWT ,  getTask)
taskRouter.route('/tasks/:taskId').patch(verifyJWT ,  updateTask)
taskRouter.route('/tasks/:taskId').delete(verifyJWT ,  deleteTask)





module.exports = {taskRouter}