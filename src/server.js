const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route");
const roleRoutes = require("./routes/role.route");

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

mongoose.connect("mongodb://localhost:27017/test").then(() => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => console.log("Server running on port 5000"));
});
