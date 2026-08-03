const bcrypt = require("bcrypt");
const hashed = async(token)=>{
  return await bcrypt.hash(token,10);
};
const compareToken = async(token,hashedToken)=>{
  return await bcrypt.compare(token,hashedToken)
};

module.exports = {
  hashed,compareToken
}
