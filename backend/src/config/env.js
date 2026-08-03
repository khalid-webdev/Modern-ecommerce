const path = require("path");
const dotenv = require("dotenv");

dotenv.config({quiet:true });

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const mongodbUri = process.env.N_MONGO;
const port = process.env.PORT || 5000;
const nodeEnv = process.env.NODE_ENV;
const jwtAccessSecret=process.env.JWT_ACCESS_SECRET
const jwtRefreshSecret=process.env.JWT_REFRESH_SECRET
const jwtAccessTime=process.env.JWT_ACCESS_EXPIRY
const jwtRefreshTime=process.env.JWT_REFRESH_EXPIRY

if (!mongodbUri) {
  throw new Error("MONGO_URI is not defined. Please add MONGO_URI to your .env file or environment variables.");
}

module.exports = {
  clientUrl,
  port,
  nodeEnv,
  mongodbUri,
  jwtAccessSecret,
  jwtRefreshSecret,
  jwtAccessTime,
  jwtRefreshTime,
};
