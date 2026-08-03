const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const addressSchema = new mongoose.Schema({
  fullName:{type:String,required:true,trim:true},
  phone:{type:String,required:true,trim:true},
  address:{type:String,required:true,trim:true},
  city:{type:String,required:true,trim:true},
  postalCode:{type:String,required:true,trim:true},
  country:{type:String,required:true,trim:true},
},{_id:false});

const userSchema = new mongoose.Schema({
  name:{type:String,required:[true,"Name is required!"],trim:true},
  email:{type:String,required:[true,"email is required!"],unique:true, lowercase:true,trim:true},
  password:{type:String,required:[true,"Password is required!"],minLength:8,select:false},
  role:{type:String,enum:["user","admin"],default:"user"},
  addresses:[addressSchema],
},{timestamps:true});

userSchema.pre("save",async function () {
  if(!this.isModified("password")){
    return;
  }
  this.password = await bcrypt.hash(this.password,10)
});
userSchema.methods.comparePassword=async function (inputPass) {
  return await bcrypt.compare(inputPass,this.password)
}
userSchema.methods.toJSON = function(){
  const obj = this.toObject();
  delete obj.password;
  // delete obj.refreshToken;
  return obj;
}
module.exports = mongoose.model("User",userSchema);
