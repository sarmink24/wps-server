// src/routes/sectionRoutes.js
const express = require("express");
const router = express.Router();
const sectionsData = require("../data/sectionsData");

// Define a route to fetch all sections
router.get("/sections", (req, res) => {
  res.json(sectionsData);
});

// Define a route to fetch a section by ID
router.get("/sections/:sectionId", (req, res) => {
  const sectionId = req.params.sectionId;
  const section = sectionsData.find((s) => s.sectionId === sectionId);
  if (section) {
    res.json(section);
  } else {
    res.status(404).send("Section not found");
  }
});

module.exports = router;
