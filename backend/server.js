const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const bugRoutes = require("./routes/bugroutes");
const userRoutes  = require("./routes/userroutes");

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: "http://localhost:5173",   
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());

app.use("/bugs", bugRoutes);
app.use("/users", userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Error: " + err));
