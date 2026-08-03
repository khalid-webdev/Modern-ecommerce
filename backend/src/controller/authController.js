const asyncHandler = require("../middleware/asyncHandler");
const {registerSchema} = require("../validators/authValidator")
const ApiError=require("../utils/ApiError");
const User =require("../models/User");
const {generateAccessToken,generateRefreshToken}=require("../utils/generateToken");
const cookieOptions = require("../utils/cookieOption");


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
})
