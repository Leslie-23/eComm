const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
    console.log(err.stack);
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // Wrong mongoose Object ID error
    if (err.name === "CastError") {
      const message = `!Oops. Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
      console.log(`${err.path}`);
      console.log(`${err.stack}`); //to track the err
    }

    // Handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Hadling the duplicate mongoose key error
    if (err.code === 11000) {
      const message = `!Oops. This ${Object.keys(
        err.keyValue
      )} user already exists`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = `!Oops. Json web token is invalid. Try again`;
      error = new ErrorHandler(message, 400);
    }

    // Handling expired jwt error
    if (err.name === "tokenExpiredError") {
      const message = `!Oops. Json web token is expired. Try again`;
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: err.stack,
    });
  }
};
