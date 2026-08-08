const env=require("../config/env");
const ApiError =require("../utils/ApiError");
const errorHandler = (err,req,res,next)=>{
  let error=err;
  if(!(error instanceof ApiError)){
    error= new ApiError(
      error.statusCode || 500,
      error.message||"Internal server error !"
    )
  }
  let statusCode = req.statusCode===200 ? 500:res.statusCode;
  return res.status(error.statusCode).json({
    success:false,
    message:error.message,
    errors:error.errors,
    stack: env.nodeEnv==="development" ?error.stack:undefined
  });
};

module.exports = errorHandler;
