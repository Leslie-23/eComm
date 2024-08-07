const app = require("./app");
const dotenv = require("dotenv");

// setting up config file
dotenv.config({ path: "server/config/config.env" });

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
