const mongoose = require("mongoose");
const { mongodbUri } = require("./env");


const connectDb = async()=>{
  try {
    const conn = await mongoose.connect(mongodbUri);
    console.log(`Mongodb connection successfull! ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB Failed`, error.message );
    process.exit(1)
  }
}

module.exports = connectDb;
