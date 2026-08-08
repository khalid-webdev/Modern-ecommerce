const dotenv =require("dotenv");
dotenv.config({quiet:true });

const requiredEnvVariables =["PORT","N_MONGO","JWT_ACCESS_SECRET","JWT_REFRESH_SECRET"];


requiredEnvVariables.forEach(key => {
if(!process.env[key]){
  throw new Error(`Missing required env variable ${key}`)
};
});


  const env = {
    nodeEnv:process.env.NODE_ENV || "development",
    port:Number(process.env.PORT) || 5000,
    clientUrl:process.env.CLIENT_URL,
    mongoUri:process.env.N_MONGO,
    jwt:{
      accessSecret:process.env.JWT_ACCESS_SECRET,
      refreshSecret:process.env.JWT_REFRESH_SECRET,
      accessExpires:process.env.JWT_ACCESS_EXPIRY,
      refreshExpires:process.env.JWT_REFRESH_EXPIRY
    }
  }



module.exports = env;
