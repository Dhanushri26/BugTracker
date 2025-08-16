const express = require("express");
const app = express();
const bugRoutes = require("./routes/bugRoutes");

app.use(express.json());

// use bug routes
app.use("/bugs", bugRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
