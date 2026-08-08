const jwt = require("jsonwebtoken");
const env = require("../config/env");


const auth = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    res.status(403).json({success:false,message:"No Token! Access denied"})
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token,env.jwt.accessSecret);
    req.user=decoded;
    next()
  } catch (error) {
    res.status(401).json({success:false,message:`Invalid Token! err:${err.message}`});
  }
}
module.exports = auth;
