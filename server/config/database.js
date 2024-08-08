const mongoose = require("mongoose");
const dotenv = require("dotenv");

// settig up the .env loader
dotenv.config({ path: __dirname + "/config/config.env" });
process.env.MONGO_URI =
  "mongodb+srv://leslie-23:Kzut1mjOH9HglWDv@ecommercedetails.tn7dz.mongodb.net/";
const connectDatabase = () => {
  // console.log(`MONGO_URI: ${process.env.MONGO_URI}`); //testing the  connection (.env to be fixed)

  mongoose
    .connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      //bufferCommands: false, // Disable mongoose buffering
      // bufferTimeoutMS: 30000, // Optional, increase timeout duration no longer supported
    })
    .then((con) =>
      console.log(`MongoDB connected to HOST: ${con.connection.host}`)
    )
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;
