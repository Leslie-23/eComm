// jwtToken.js

//  create and send token and save in the cookie
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config/config.env" });
const sendToken = (user, statusCode, res) => {
  // create JWT token
  const token = user.getJWTToken();

  // options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION_TIME * 24 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
module.exports = sendToken;
