const express = require("express"); //importing express
const errorMiddleware = require("../server/middlewares/errors"); // import middleware

const app = express(); //initializing express
app.use(express.json()); //middleware to parse json

// import all routes
const products = require("./routes/products");
const auth = require("./routes/auth.js");

app.use("/api/v1", products);
app.use("/api/v1", auth);

// middleware to handle errors ( globally )
app.use(errorMiddleware);

module.exports = app;
