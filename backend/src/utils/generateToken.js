const jwt = require("jsonwebtoken");
const { jwtAccessSecret, jwtAccessTime, jwtRefreshSecret, jwtRefreshTime } = require("../config/env");

const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, jwtAccessSecret, {
    expiresIn: jwtAccessTime || "15m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, jwtRefreshSecret, {
    expiresIn: jwtRefreshTime || "7d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
