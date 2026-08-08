const mongoose = require("mongoose");
const env = require("./env");


const connectDb = async()=>{
  try {
    const conn = await mongoose.connect(env.mongoUri);
    console.log(`Mongodb connection successfull! ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB Failed`, error.message );
    process.exit(1)
  }
}

module.exports = connectDb;
