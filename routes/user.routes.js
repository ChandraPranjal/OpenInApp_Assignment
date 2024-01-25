const express = require('express')
const userRouter = express.Router()
const {createUser} = require('../controllers/userControllers')

userRouter.route('/users').post(createUser)


module.exports = {userRouter}