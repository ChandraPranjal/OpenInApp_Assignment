const express  = require('express')
const subTaskRouter = express.Router()

const {verifyJWT} = require('../middlewares/auth.middleware')

const {createSubTask, getSubTask, updateSubTask, deleteSubTask} = require('../controllers/subTask.controllers')

subTaskRouter.route('/subtasks').post(verifyJWT,createSubTask)
subTaskRouter.route('/subtasks').get(verifyJWT,getSubTask)
subTaskRouter.route('/subtasks/:subtaskId').patch(verifyJWT,updateSubTask)
subTaskRouter.route('/subtasks/:subtaskId').delete(verifyJWT,deleteSubTask)


module.exports = {subTaskRouter}