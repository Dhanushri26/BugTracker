const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const bugRoutes = require("./routes/bugroutes");
const userRoutes  = require("./routes/userroutes");

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "https://bug-tracker-smoky.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests and configured browser origins.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

app.use("/bugs", bugRoutes);
app.use("/users", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync(); // add this
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Error: " + err));
