const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/* ------------------------------------ address Schema ----------------------------------- */

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
}, { _id: false });

/* ------------------------------ sessionSchema ----------------------------- */

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, default: crypto.randomUUID() },
  token: { type: String, required: true, select: false },
  userAgent: { type: String, trim: true, default: "Unknown Device" },
  ipAddress: { type: String, trim: true, default: "Unknown IP" },
  expiresAt: { type: Date, required: true },
  lastUsedAt: { type: Date, default: Date.now },
}, { timestamps: true });

/* ------------------------------- user schema ------------------------------ */

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required!"], trim: true },
  email: { type: String, required: [true, "email is required!"], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, "Password is required!"], minLength: 8, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  addresses: { type: [addressSchema], default: [] },
  sessions: { type: [sessionSchema], default: [] },
}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10)
});
userSchema.methods.comparePassword = async function (inputPass) {
  return await bcrypt.compare(inputPass, this.password)
}
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
}

userSchema.methods.addSession = async function ({ token, userAgent, ipAddress, expiresAt }) {
  this.session.push({
    token,
    userAgent,
    ipAddress,
    expiresAt,
    lastUsedAt: new Date(),
  });
  await this.save();
  return this.sessions[this.sessions.length - 1];
};
userSchema.methods.findSessionById = function (sessionId) {
  return this.sessions.find((s) => s.sessionId === sessionId);
}
userSchema.methods.removeSession =async function (sessionId) {
   this.sessions.filter((s) => s.sessionId !== sessionId);
   await this.save();
}
userSchema.methods.removeExpiredSessions = async function(){
  const now = new Date();
  this.sessions.filter((s)=>{
    s.expiresAt > now;
  });
  await this.save();
};
userSchema.methods.removeAllSessions = async function(){
  this.sessions=[];
  await this.save();
}


userSchema.methods.registerSession = function (session) {
    this.sessions.push({
        sessionId: session.sessionId,
        refreshToken: session.hashedRefreshToken,
        expiresAt: session.expiresAt,
        ip: session.ip,
        userAgent: session.userAgent,
        lastUsed: new Date(),
    });
};


module.exports = mongoose.model("User", userSchema);
