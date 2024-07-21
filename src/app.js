require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sectionRoutes = require("./routes/sectionRoutes");
const userDataRoutes = require("./routes/userDataRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

app.use("/api", sectionRoutes);
app.use("/api", userDataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
