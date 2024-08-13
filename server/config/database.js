const mongoose = require("mongoose");
const dotenv = require("dotenv");

// settig up the .env loader
dotenv.config({ path: __dirname + "/config/config.env" });

// Connect to MongoDB database
const connectDatabase = () => {
  // console.log(`MONGO_URI: ${process.env.MONGO_URI}`); //testing the  connection (.env to be fixed)

  mongoose
    .connect(process.env.MONGO_URI, {
      // useNewUrlParser: true, //deprecated
      // useUnifiedTopology: true, //deprecated
      //bufferCommands: false, // Disable mongoose buffering (deprecated)
      // bufferTimeoutMS: 30000, // Optional, increase timeout duration no longer supported (you guessed it deprecated)
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
