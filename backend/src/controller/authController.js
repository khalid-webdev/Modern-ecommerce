const asyncHandler = require("../utils/asyncHandler");


exports.register = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: `Register service is not implemented yet` })
})
exports.login = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: `Register service is not implemented yet` })
})
exports.refresh = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: `Register service is not implemented yet` })
})
exports.logout = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: `Register service is not implemented yet` })
});























// const jwt = require("jsonwebtoken");
// const {registerSchema, loginSchema} = require("../validators/authValidator")
// const ApiError=require("../utils/ApiError");
// const User =require("../models/User");
// const {generateAccessToken,generateRefreshToken}=require("../utils/generateToken");
// const cookieOptions = require("../utils/cookieOption");
// const env = require("../config/env");
// const { hashed,compareToken } = require("../utils/token");

// //^ register api
// exports.register = asyncHandler(async(req,res)=>{
//   const {error,value}=registerSchema.validate(req.body);
//   if(error){
//     throw new ApiError(400,error.details[0].message)
//   }
//   const {name,email,password}=value;
//   const existingUser =await User.findOne({email});
//   if(existingUser){
//        throw new ApiError(400,"User already register! try login");
//   }
//   const newUser = new User({
//     name,email,password
//   });
//   console.log(typeof cookieOptions);
//   const accessToken = generateAccessToken(newUser._id,newUser.role);
//   const refreshToken = generateRefreshToken(newUser._id);
//   newUser.refreshToken = await hashed(refreshToken);
//   await newUser.save();
//   res.cookie(
//     "refreshToken",
//     refreshToken,
//     cookieOptions
//   );
//   res.status(201).json({success:true,accessToken,message:"Registration Successfull!",user:newUser.toJSON()});
// });

// //* login api
// exports.login = asyncHandler(async(req,res)=>{
//   const {error,value} = loginSchema.validate(req.body);
//   if(error){
//     throw new ApiError(400,error.details[0].message);
//   }
//   const {email,password} = value;
//   const user = await User.findOne({email}).select("+password");
//   if(!user){
//     throw new ApiError(401,"Invalid credentials!");
//   }
//   const isMatch = await user.comparePassword(password);
//   if(!isMatch){
//     throw new ApiError(401,"Invalid credentials!");
//   }
//   const accessToken = generateAccessToken(user._id,user.role);
//   const refreshToken = generateRefreshToken(user._id);
//   user.refreshToken = await hashed(refreshToken);
//   await user.save();
//   res.cookie("refreshToken",refreshToken,cookieOptions);
//   res.status(200).json({success:true,message:"Login successfull",accessToken,user:user.toJSON()});

// });

// //^refreshToken api it will be post request
// exports.refreshToken = asyncHandler(async(req,res)=>{
//   const token = req.cookies.refreshToken;
//   if(!token){
//     throw new ApiError(401,"Refresh token is missing!");
//   }
//   const decoded = jwt.verify(token,env.jwt.refreshSecret);
//   const user = await User.findById(decoded.id).select(" +refreshToken");
//   if(!user){
//     throw new ApiError(401,"User not found!");
//   }
//   const isValid = await compareToken(token,user.refreshToken);
//   if(!isValid){
//     throw new ApiError(401,"Refresh token is not matched")
//   }
//   const newRefreshToken = generateRefreshToken(user._id);
//   user.refreshToken  = await hashed(newRefreshToken);
//   await user.save();
//   const accessToken = generateAccessToken(user._id,user.role);
//   res.status(200).json({success:true,accessToken});
// })

// //* logout api
// exports.logout = asyncHandler(async(req,res)=>{
//   const token = req.cookies.refreshToken;
//   if(token){
//     const decode = jwt.verify(token,env.jwt.refreshSecret);
//     await User.findByIdAndUpdate(decode.id,{
//       $unset:{
//         refreshToken:1
//       }
//     })
//   }
//   res.clearCookie("refreshToken",cookieOptions);

//   res.json({success:true,message:"Logout successfully."})
// });




// //todo ****blank  copied from chat
// // const asyncHandler = require("../utils/asyncHandler");

// // const register = asyncHandler(async (req, res) => {
// //     res.status(501).json({
// //         success: false,
// //         message: "Register service is not implemented yet",
// //     });
// // });

// // const login = asyncHandler(async (req, res) => {
// //     res.status(501).json({
// //         success: false,
// //         message: "Login service is not implemented yet",
// //     });
// // });

// // const refresh = asyncHandler(async (req, res) => {
// //     res.status(501).json({
// //         success: false,
// //         message: "Refresh service is not implemented yet",
// //     });
// // });

// // const logout = asyncHandler(async (req, res) => {
// //     res.status(501).json({
// //         success: false,
// //         message: "Logout service is not implemented yet",
// //     });
// // });

// // module.exports = {
// //     register,
// //     login,
// //     refresh,
// //     logout,
// // };
