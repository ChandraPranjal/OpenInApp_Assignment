const cron = require("node-cron");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountSid, authToken);

const User = require("../models/user.model");
const Task = require("../models/task.model");



// Define the cron schedule (runs every day at midnight)
const  callCron =  cron.schedule('0 0 * * *', async () => {
  try {
    // Find overdue tasks
    const overdueTasks = await Task.find({
      dueDate: { $lt: new Date() },
      isDeleted: false,
    }).populate('userId');


    const sortedTasks = overdueTasks.sort((a, b) => a.userId.priority - b.userId.priority);


    sortedTasks.forEach(async (task) => {
      const userPhoneNumber = task.userId.phone_number;

      try {
        await client.calls.create({
          url: 'http://demo.twilio.com/docs/voice.xml',
          to: `+${userPhoneNumber}`, 
          from: phoneNumber, 
        });
        console.log(`Voice call initiated for user with phone number: ${userPhoneNumber}`);
      } catch (error) {
        console.error(`Error initiating voice call for user with phone number: ${userPhoneNumber}`, error);
      }
    });
  } catch (error) {
    console.error('Error fetching overdue tasks:', error);
  }
});


module.exports = {callCron}