const app = require("./app");
const dotenv = require("dotenv");
const connectDatabse = require("./config/database");

// setting up config file
dotenv.config({ path: "../server/config/config.env" });

// connecting to database
connectDatabse();

// PORT = process.env.PORT || 3000; {/**just in case the dev server is down fallback == 3000 */}
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
