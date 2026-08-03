const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

exports.getProfile = asyncHandler(async(req,res)=>{
  const profileId = req.user.id;
  const user = await User.findById(profileId);
  if(!user){
    throw new ApiErro(401,"User not found!");
  };
  res.status(200).json({success:true,user:user.toJSON()});
});
