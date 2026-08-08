// const asyncHandler = require("../middleware/asyncHandler");
// const User = require("../models/User");

// exports.getProfile = asyncHandler(async(req,res)=>{
//   const profileId = req.user.id;
//   const user = await User.findById(profileId);
//   if(!user){
//     throw new ApiErro(401,"User not found!");
//   };
//   res.status(200).json({success:true,user:user.toJSON()});
// });


//todo blank from chat
const asyncHandler = require("../utils/asyncHandler");

exports.getMe = asyncHandler(async (req, res) => {
    res.status(501).json({
        success: false,
        message: "Get profile service is not implemented yet",
    });
});
