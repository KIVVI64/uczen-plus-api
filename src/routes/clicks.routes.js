const express = require("express");
const router = express.Router();
const clicksController = require("../controllers/clicks.controller");

// Retrieve all templates
router.get("/", clicksController.countAll);

// Create a new template
router.post("/", clicksController.create);

// Retrieve a clicks by teacher
router.get("/teacher/:teacher_id", clicksController.findByTeacherId);

// Retrieve a clicks by school
router.get("/school/:school_id", clicksController.findBySchoolId);

// Retrieve a clicks by user
router.get("/user/:user_id", clicksController.findByUserId);

// Delete a template with id
//router.delete("/:id", clicksController.delete);

module.exports = router;
