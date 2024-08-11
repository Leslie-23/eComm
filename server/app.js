// app.js

const express = require("express"); //importing express
const app = express(); //initializing express

const cookieParser = require("cookie-parser");
const errorMiddleware = require("../server/middlewares/errors"); // import middleware

app.use(express.json()); //middleware to parse json
app.use(cookieParser); //initializing the cookiee-parser so as to extract the value from the sever.

// importing all routes
const products = require("./routes/products");
const auth = require("./routes/auth.js");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// middleware to handle errors ( globally )
app.use(errorMiddleware);

module.exports = app;
