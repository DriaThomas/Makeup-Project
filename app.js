// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "Makeup-Project";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/auth", auth);

// const user = require("./routes/user");
// app.use("/user", user);

const products = require("./routes/product.routes");
app.use("/product", products);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

app.use("/collection", require("./routes/collection.routes"));

// const reviewRoutes = require("./routes/review.routes");
// app.use("/review", reviewRoutes);

const rankings = require("./routes/rankings.routes");
app.use("/rankings", rankings);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
