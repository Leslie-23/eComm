const express = require("express"); //importing express
const errorMiddleware = require("../server/middlewares/errors"); // import middleware

// import  cookie-parser
const cookieParser = require("cookie-parser");

const app = express(); //initializing express
app.use(express.json()); //middleware to parse json
app.use(cookieParser); //initializing the cookiee-parser so as to extract the value from the sever.
// import all routes
const products = require("./routes/products");
const auth = require("./routes/auth.js");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// middleware to handle errors ( globally )
app.use(errorMiddleware);

module.exports = app;
