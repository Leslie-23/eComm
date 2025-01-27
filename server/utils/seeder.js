const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database.js");
// const { connect } = require("mongoose");
const products = require("../data/product.json");

// setting the .env
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("All Products are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedProducts();
