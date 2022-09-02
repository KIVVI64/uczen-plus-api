const express = require("express");
const router = express.Router();
const TeacherCommentController = require("../controllers/teacher-comment.controller");

// Retrieve all comments
//router.get("/", TeacherCommentController.findAll);

// Create a new comment
router.post("/", TeacherCommentController.create); //todo: NIE DZIAŁA "message": "Please provide all required field"

// Retrieve a single comment with id
router.get("/:id", TeacherCommentController.findById);

// Search comments by uid/teacher/user
router.get("/uid/:uid", TeacherCommentController.findByUid);
router.get("/teacher/:teacher_id", TeacherCommentController.findByTeacherId);
router.get("/user/:user_id", TeacherCommentController.findByUserId);

// Update a comment with id
router.put("/:id", TeacherCommentController.update);

// Delete a comment with id
//router.delete("/:id", TeacherCommentController.delete);

module.exports = router;
