const express = require("express");
const router = express.Router();
const templateController = require("../controllers/template.controller");

// Retrieve all templates
router.get("/", templateController.findAll);

// Create a new template
router.post("/", templateController.create);

// Retrieve a single template with id
router.get("/:id", templateController.findById);

// Update a template with id
router.put("/:id", templateController.update);

// Delete a template with id
router.delete("/:id", templateController.delete);

module.exports = router;
