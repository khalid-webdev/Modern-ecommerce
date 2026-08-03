const admin = (req,res,next)=>{
  if(req.user.role!=="admin"){
    return res.status(403).json({message:"Admin access required!",success:false})
  }
  next();
}
module.exports = admin;
