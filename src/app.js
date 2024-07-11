require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sectionRoutes = require("./routes/sectionRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/api", sectionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
