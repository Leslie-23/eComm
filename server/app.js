const express = require("express"); //importing express
const errorMiddleware = require("../server/middlewares/errors"); // import middleware

const app = express(); //initializing express
app.use(express.json()); //middleware to parse json

// import all routes
const products = require("./routes/products");

app.use("/api/v1", products);

// middleware to handle errors ( globally )
app.use(errorMiddleware);

module.exports = app;
