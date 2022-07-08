const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Retrieve all templates
router.get("/", userController.findAll);

// Create a new template
router.post("/", userController.create);

// Retrieve a single template with id
router.get("/:id", userController.findById);
router.get("/uid/:uid", userController.findByUid);

// Update a template with id
router.put("/:id", userController.update);

// Delete a template with id (change closed file)
router.delete("/:id", userController.delete);

module.exports = router;
