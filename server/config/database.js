const mongoose = require("mongoose");
const dotenv = require("dotenv");

// settig up the .env loader
dotenv.config({ path: "server/config/config.env" });
const connectDatabase = () => {
  if (!process.env.MONGO_URI) {
    console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
    throw new Error("MONGO_URI is not defined");
  }
  console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then((con) => console.log(`mongoDB connected to ${con.connection.host}`));
};
module.exports = connectDatabase;
