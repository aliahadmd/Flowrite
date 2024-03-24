import "dotenv/config";
import express from "express";
import sequelize from "./config/data.config.js";
import homeRoute from "./routes/home.route.js";
import adminRoute from "./routes/admin.route.js";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

//ejs setup
app.use(expressLayouts);
app.set("layout", "layout/layout");
app.set("view engine", "ejs");
// static files
app.use(express.static("public"));

app.use("/", homeRoute);
app.use("/admin", adminRoute);

const PORT=process.env.PORT

try {
  // database configuration
  sequelize.sync();
  console.log("Database connection has been established successfully.");
  app.listen(PORT || 8003, () => console.log(`Server running on port http://localhost:${PORT}`));
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
