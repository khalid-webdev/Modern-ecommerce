const ApiResponse = require("./ApiResponse");
const cookieOptions = require("./cookieOption");

const sendAuthResponse = (res,{
   statusCode=200,  message="success",  accessToken,  refreshToken,  data={},  meta=null,
}) =>{
  if(refreshToken){
    res.cookie("refreshToken",refreshToken,cookieOptions);
  }

  return res.status(statusCode).json(new ApiResponse(statusCode,{accessToken,...data},message,meta));
};

module.exports = sendAuthResponse;
