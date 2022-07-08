const express = require("express");
const router = express.Router();
const teacherFactsController = require("../controllers/teacher-facts.controller");

// Retrieve all templates
//router.get("/", teacherFactsController.findAll);

// Create a new template
router.post("/", teacherFactsController.create);

// Retrieve a single template with id
router.get("/:id", teacherFactsController.findById);

// Retrieve a single template with id
router.get("/teacher/:teacher_id", teacherFactsController.findByTeacherId);
router.get("/user/:user_id", teacherFactsController.findByUserId);
router.get("/uid/:uid", teacherFactsController.findByUid);

// Update a template with id
//router.put("/:id", teacherFactsController.update);

module.exports = router;
