const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

// app.get("/", (req, res) => {
//   res.send("DevLink API is running");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
