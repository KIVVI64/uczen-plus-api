const express = require("express");
const router = express.Router();
const teacherInfoController = require("../controllers/teacher-info.controller");

// Retrieve all templates
//router.get("/", teacherInfoController.findAll);

// Create a new template
router.post("/", teacherInfoController.create);

// Retrieve a single template with id
router.get("/:id", teacherInfoController.findById);

// Retrieve a single template with id
router.get("/teacher/:teacher_id", teacherInfoController.findByTeacherId);
router.get("/user/:user_id", teacherInfoController.findByUserId);

// Update a template with id
//router.put("/:id", teacherFactsController.update);

module.exports = router;
