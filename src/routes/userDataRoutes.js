const express = require("express");
const fs = require("fs");
const router = express.Router();

// Endpoint to receive form data
router.post("/submit-form", (req, res) => {
  const formData = req.body;

  // Read existing data from file
  fs.readFile("src/data/userData.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    // Append new form data
    jsonData.push(formData);

    // Write updated data to file
    fs.writeFile(
      "src/data/userData.json",
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(201).send("Form data saved successfully");
      }
    );
  });
});

module.exports = router;
