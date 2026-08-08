const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const env= require("../config/env");

// todo of token service
// generate accessToken
//generate refreshTOken
// generater sessioinid
//verify accessToken
//verify refreshToken
//hashed the refreshToken
//compare the refresh token

class TokenService{
    //no constructor here cause we don't need to create an instance
    generateAccessToken({userId,role}){
      return jwt.sign(
        {sub:userId,role:role},
        env.jwt.accessSecret,
        {expiresIn:env.jwt.accessExpires || "15m"}
      );
    }

    //generate refresh token
    generateRefreshToken (userId,sessionId){
      return jwt.sign(
        {sub:userId,sid:sessionId},
        env.jwt.refreshSecret,
        {expiresIn:env.jwt.refreshExpires}
      );
    }

    //generate session id
    generateSessionId (){
      return crypto.randomUUID();
    }


    //verify access token
    verifyAccessToken(token){
      return jwt.verify(token,env.jwt.accessSecret)
    }

    //verify Refresh token
    verifyRefreshToken(token){
      return jwt.verify(token,env.refreshToken);
    }

    //hash refreshToken
    async hashRefreshToken(refreshToken){
      const saltNum = await bcrypt.genSalt(10);
      return bcrypt.hash(refreshToken,saltNum)
    }
    // compare hashedRefreshToken
    async compareRefreshToken(plainRefreshToken,hashedRefreshToken){
      return bcrypt.compare(plainRefreshToken,hashedRefreshToken)
    }

}

module.exports = new TokenService();
