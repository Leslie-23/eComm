const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDatabse = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then((con) => console.log(`mongoDB connected to ${con.connection.host}`));
};
module.exports = connectDatabse;
