const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt  = require('jsonwebtoken')
const { Task } = require("./models/task.model");

app.use(express.json());
app.use(cookieParser());

//Routes

const { taskRouter } = require("./routes/task.routes");
const { userRouter } = require("./routes/user.routes");
const { subTaskRouter } = require("./routes/subTask.routes");
const { User } = require("./models/user.model");

app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", subTaskRouter);


module.exports = { app };
