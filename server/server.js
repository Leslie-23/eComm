// const app = require("./app");
// const dotenv = require("dotenv");
// const connectDatabse = require("./config/database");
// const cors = require("cors");

// // app.use(cors());

// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message} \n ${err.stack}`);
//   console.log(`Shutting down server due to uncaught Exception`);
//   process.exit(1);
// });

// // console.log(s); //test value to ensure the uncaught exception is logged to the console

// // setting up config file
// dotenv.config({ path: "../server/config/config.env" });

// // connecting to database
// connectDatabse();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow cookies to be sent across domains if necessary
//     allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//   })
// );
// app.options("*", cors()); // Allow all preflight OPTIONS requests

// // PORT = process.env.PORT || 3000; {/**just in case the dev server is down fallback == 3000 */}
// const server = app.listen(process.env.PORT, () => {
//   console.log(
//     `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
//   );
// });

// // Handle Unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message} \n ${err.stack}`);
//   console.log(`Shutting down server due to unhandled promise rejection`); //to test mess up the MONGO_URI in the 'config.env. file
//   server.close(() => {
//     process.exit(1);
//   });
// });

// const app = require("./app");
// const dotenv = require("dotenv");
// const connectDatabase = require("./config/database");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");

// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// // const errorMiddleware = require("../server/middlewares/errors"); // import middleware
// const cloudinary = require("cloudinary");

// dotenv.config({ path: "../server/config/config.env" });
// // Handle uncaught exceptions
// process.on("uncaughtException", (err) => {
//   console.log(`Error: ${err.message} \n ${err.stack}`);
//   console.log(`Shutting down server due to uncaught exception`);
//   process.exit(1);
// });

// // Load environment variables from config file

// // Connect to the database
// connectDatabase();
// // app.use(express.json()); //middleware to parse json
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser()); //initializing the cookiee-parser so as to extract the value from the sever.
// app.use(fileUpload());
// // app.use(cors())
// // Enable CORS with custom settings
// app.use(
//   cors({
//     origin: "*", // Allow requests from this origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
//     credentials: true, // Allow cookies to be sent across domains if necessary
//     allowedHeaders: ["Content-Type", "application/json"], // Allowed headers
//     exposedHeaders: ["Content-Type", "application/json"], // Exposed headers
//   })
// );

// // Handle preflight requests for all routes
// app.options("*", cors());

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// // Start the server
// const server = app.listen(process.env.PORT || 4000, () => {
//   console.log(
//     `Server started on PORT: ${process.env.PORT || 4000} in ${
//       process.env.NODE_ENV
//     } mode`
//   );
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error(`Error: ${err.message} \n ${err.stack}`);
//   console.error(`Shutting down server due to unhandled promise rejection`);
//   server.close(() => {
//     process.exit(1);
//   });
// });
const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const cors = require("cors");

app.use(
  cors({
    origin: "*", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent across domains if necessary
    allowedHeaders: ["Content-Type", "*"], // Allowed headers
    exposedHeaders: ["Content-Type", "*"], // Exposed headers
  })
);
dotenv.config({ path: "./config/config.env" });

connectDatabase();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
  `${process.env.CLOUDINARY_API_KEY} ${process.env.CLOUDINARY_API_SECRET} ${process.env.CLOUDINARY_CLOUD_NAME}`
);

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT || 4000} in ${
      process.env.NODE_ENV
    } mode`
  );
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message} \n ${err.stack}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message} \n ${err.stack}`);
  console.error(`Shutting down server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
