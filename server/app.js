const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("../server/middlewares/errors");

dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "application/json"],
    exposedHeaders: ["Content-Type", "application/json"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, //50MB lmit
  })
);

const products = require("./routes/products.js");
const auth = require("./routes/auth.js");
const order = require("./routes/order.js");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

app.use(errorMiddleware);

module.exports = app;

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const dotenv = require("dotenv");
// const fileUpload = require("express-fileupload");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const errorMiddleware = require("../server/middlewares/errors");
// const cloudinary = require("cloudinary");

// dotenv.config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     allowedHeaders: ["Content-Type", "application/json"],
//     exposedHeaders: ["Content-Type", "application/json"],
//   })
// );

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(fileUpload());

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const products = require("./routes/products.js");
// const auth = require("./routes/auth.js");
// const order = require("./routes/order.js");

// app.use("/api/v1", products);
// app.use("/api/v1", auth);
// app.use("/api/v1", order);

// app.use(errorMiddleware);

// module.exports = app;

// // app.js
// const express = require("express"); //importing express
// const app = express(); //initializing express
// const cors = require("cors");
// const dotenv = require("dotenv");
// const fileUpload = require("express-fileupload");

// dotenv.config({ path: "./config/config.env" });

// app.use(cors());

// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const errorMiddleware = require("../server/middlewares/errors"); // import middleware
// const cloudinary = require("cloudinary");

// app.use(express.json()); //middleware to parse json
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser()); //initializing the cookiee-parser so as to extract the value from the sever.
// app.use(fileUpload());

// // setting up cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // importing all routes
// const products = require("./routes/products.js");
// const auth = require("./routes/auth.js");
// const order = require("./routes/order.js");

// app.use("/api/v1", products);
// app.use("/api/v1", auth);
// app.use("/api/v1", order);

// // middleware to handle errors ( globally )
// app.use(errorMiddleware);

// module.exports = app;
