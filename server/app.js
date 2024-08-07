const express = require("express"); //importing express

const app = express(); //initializing express
app.use(express.json()); //middleware to parse json

// import all routes
const products = require("./routes/products");

app.use("/api/v1", products);

module.exports = app;
