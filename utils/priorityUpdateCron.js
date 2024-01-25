// Import necessary modules and models
const cron = require('node-cron');
const { Task } = require("../models/task.model");


const cronSchedule = '0 0 * * *';


const priorityUpdateCron = cron.schedule(cronSchedule, async () => {
    console.log("Cron Job Started");
    try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    const tasksToday = await Task.find({
      dueDate: today,
      isDeleted: false, 
    });


    tasksToday.forEach(async (task) => {
      await Task.findByIdAndUpdate(task._id, { priority: 0 });
    });


    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    dayAfterTomorrow.setHours(0, 0, 0, 0);

    const tasksTomorrowAndDayAfter = await Task.find({
      dueDate: { $gte: tomorrow, $lt: dayAfterTomorrow },
      isDeleted: false,
    });


    tasksTomorrowAndDayAfter.forEach(async (task) => {
      await Task.findByIdAndUpdate(task._id, { priority: 1 });
    });


    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);
    threeDaysFromNow.setHours(0, 0, 0, 0);

    const fourDaysFromNow = new Date();
    fourDaysFromNow.setDate(today.getDate() + 4);
    fourDaysFromNow.setHours(0, 0, 0, 0);

    const tasks3To4DaysFromNow = await Task.find({
      dueDate: { $gte: threeDaysFromNow, $lt: fourDaysFromNow },
      isDeleted: false,
    });


    tasks3To4DaysFromNow.forEach(async (task) => {
      await Task.findByIdAndUpdate(task._id, { priority: 2 });
    });


    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);
    fiveDaysFromNow.setHours(0, 0, 0, 0);

    const tasks5PlusDaysFromNow = await Task.find({
      dueDate: { $gte: fiveDaysFromNow },
      isDeleted: false,
    });


    tasks5PlusDaysFromNow.forEach(async (task) => {
      await Task.findByIdAndUpdate(task._id, { priority: 3 });
    });

    console.log('Task priorities updated successfully');
  } catch (error) {
    console.error('Error updating task priorities:', error);
  }
});


module.exports = {priorityUpdateCron}
