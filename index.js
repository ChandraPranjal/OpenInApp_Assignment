const { connectDb } = require("./db/index");

const dotenv = require("dotenv").config();

const { app } = require("./app");
const  {priorityUpdateCron} = require('./utils/priorityUpdateCron')
const {callCron} = require('./utils/twilioCallCron')

connectDb()
  .then(() => {
    priorityUpdateCron.start();
    callCron.start();
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on PORT ", process.env.PORT || 3000);
    });
  })
  .catch((err) => {
    console.log("Server failed to start ", err);
  });
