const { port, mongodbUri,nodeEnv } = require("./config/env");
const connectDb = require("./config/db");
const app = require("./index");


const startServer = async()=>{
  await connectDb();
  app.listen(port,console.log(`Server running in ${nodeEnv} mode on port ${port}`));
}
startServer();
