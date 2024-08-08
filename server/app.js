const express = require("express"); //importing express
const errorMiddleware = require("../middlewares/error.js");

const app = express(); //initializing express
app.use(express.json()); //middleware to parse json

// import middleware

// import all routes
const products = require("./routes/products");

app.use("/api/v1", products);

// middleware to handle errors ( globally )
app.use(errorMiddleware);

module.exports = app;
