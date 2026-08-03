const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");
const {registerSchema, loginSchema} = require("../validators/authValidator")
const ApiError=require("../utils/ApiError");
const User =require("../models/User");
const {generateAccessToken,generateRefreshToken}=require("../utils/generateToken");
const cookieOptions = require("../utils/cookieOption");
const { jwtRefreshSecret } = require("../config/env");

//^ register api
exports.register = asyncHandler(async(req,res)=>{
  const {error,value}=registerSchema.validate(req.body);
  if(error){
    throw new ApiError(400,error.details[0].message)
  }
  const {name,email,password}=value;
  const existingUser =await User.findOne({email});
  if(existingUser){
       throw new ApiError(400,"User already register! try login");
  }
  const newUser = new User({
    name,email,password
  });
  console.log(typeof cookieOptions);
  const accessToken = generateAccessToken(newUser._id,newUser.role);
  const refreshToken = generateRefreshToken(newUser._id);
  await newUser.save();
  res.cookie(
    "refreshToken",
    refreshToken,
    cookieOptions
  );
  res.status(201).json({success:true,accessToken,message:"Registration Successfull!",user:newUser.toJSON()});
});

//* login api
exports.login = asyncHandler(async(req,res)=>{
  const {error,value} = loginSchema.validate(req.body);
  if(error){
    throw new ApiError(400,error.details[0].message);
  }
  const {email,password} = value;
  const user = await User.findOne({email}).select("+password");
  if(!user){
    throw new ApiError(401,"Invalid credentials!");
  }
  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    throw new ApiError(401,"Invalid credentials!");
  }
  const accessToken = generateAccessToken(user._id,user.role);
  const refreshToken = generateRefreshToken(user._id);
  res.cookie("refreshToken",refreshToken,cookieOptions);
  res.status(200).json({success:true,message:"Login successfull",accessToken,user:user.toJSON()});

});

//^refreshToken api it will be post request
exports.refreshToken = asyncHandler(async(req,res)=>{
  const token = req.cookies.refreshToken;
  if(!token){
    throw new ApiError(401,"Refresh token is missing!");
  }
  const decoded = jwt.verify(token,jwtRefreshSecret);
  console.log(decoded);
  const user = await User.findById(decoded.id);
  if(!user){
    throw new ApiError(401,"User not found!");
  }
  const accessToken = generateAccessToken(user._id,user.role);
  res.status(200).json({success:true,accessToken});
})
