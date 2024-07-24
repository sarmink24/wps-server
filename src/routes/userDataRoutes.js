const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// // Function to reorder object keys
// const reorderKeys = (obj, keyOrder) => {
//   const ordered = {};
//   keyOrder.forEach(key => {
//     if (obj.hasOwnProperty(key)) {
//       ordered[key] = obj[key];
//     }
//   });
//   Object.keys(obj).forEach(key => {
//     if (!keyOrder.includes(key)) {
//       ordered[key] = obj[key];
//     }
//   });
//   return ordered;
// };

// // Endpoint to receive form data
// router.post("/submit-form", (req, res) => {
//   const formData = req.body;

//   // Define the file path
//   const filePath = path.join(__dirname, "..", "data", "userData.json");

//   // Read existing data from file
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     let jsonData = [];
//     if (data) {
//       jsonData = JSON.parse(data);
//     }

//     // Determine the new ID
//     const newId = jsonData.length > 0 ? jsonData[jsonData.length - 1].id + 1 : 1;
//     formData.id = newId;

//     // Reorder the keys to place 'id' first
//     const reorderedFormData = reorderKeys(formData, ['id']);

//     // Append new form data
//     jsonData.push(reorderedFormData);

//     // Write updated data to file
//     fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
//       if (err) {
//         console.error("Error writing file:", err);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }

//       res.status(201).json({ message: "Form data saved successfully", id: formData.id });
//     });
//   });
// });

// Function to reorder object keys
const reorderKeys = (obj, keyOrder) => {
  const ordered = {};
  keyOrder.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      ordered[key] = obj[key];
    }
  });
  Object.keys(obj).forEach((key) => {
    if (!keyOrder.includes(key)) {
      ordered[key] = obj[key];
    }
  });
  return ordered;
};

// Endpoint to receive form data
router.post("/submit-form", (req, res) => {
  const formData = req.body;

  // Define the file path
  const filePath = path.join(__dirname, "..", "data", "userData.json");

  // Read existing data from file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    // Determine the new ID based on the maximum existing ID
    const newId =
      jsonData.length > 0
        ? Math.max(...jsonData.map((item) => item.id)) + 1
        : 1;
    formData.id = newId;

    // Reorder the keys to place 'id' first
    const reorderedFormData = reorderKeys(formData, ["id"]);

    // Append new form data
    jsonData.push(reorderedFormData);

    // Write updated data to file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({
        message: "Form data saved successfully",
        data: jsonData,
      });
    });
  });
});

// Endpoint to fetch all form data
router.get("/fetch-data", (req, res) => {
  // Define the file path
  const filePath = path.join(__dirname, "..", "data", "userData.json");

  // Read data from file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    // Send the data as response
    res.status(200).json(jsonData);
  });
});

module.exports = router;
