const express = require('express')
const router = express.Router()
const teacherController = require('../controllers/teacher.controller');

// Retrieve all teachers
router.get('/', teacherController.findAll);

// Create a new teacher
router.post('/', teacherController.create);

// Retrieve a basic info about teacher with id
router.get('/:id', teacherController.findById);

// Retrieve a basic info about teacher with id
router.get('/school/:school_id', teacherController.findBySchoolId);

// Retrive search result
router.get('/search/:searchQuery', teacherController.teacherSearch);

// Update a teacher with id
//router.put('/:id', teacherController.update);

// Delete a teacher with id
router.delete('/:id', teacherController.delete);

module.exports = router
