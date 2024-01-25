const mongoose = require('mongoose')
const { DB_NAME } = require("../constants");

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MongoDb connected on ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error connecting with MOngoDb ", error);
    process.exit(1);
  }
};

module.exports = {connectDb}