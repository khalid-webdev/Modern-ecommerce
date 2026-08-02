const {nodeEnv} =require("../config/env");
const errorHandler = (err,req,res,next)=>{
  let statusCode = req.statusCode===200? 500:res.statusCode;
  res.status(statusCode).json({
    success:false,
    message:err.message,
    stack: nodeEnv==="development" ?err.stack:undefined
  });
};

module.exports = errorHandler;
