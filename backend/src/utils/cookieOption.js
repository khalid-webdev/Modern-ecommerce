const { nodeEnv } = require("../config/env");
const cookieOptions = {
  httpOnly: true,
  secure: nodeEnv === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

module.exports = cookieOptions;
