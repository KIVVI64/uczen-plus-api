const express = require('express')
const router = express.Router()
const dataController = require('../controllers/teacher.controller');

// Retrieve all teachers
router.get('/', dataController.findAll);

// Create a new teacher
router.post('/', dataController.create);

// Retrieve a basic info about teacher with id
router.get('/:id', dataController.findById);

// Retrieve a basic info about teacher with id
router.get('/school/:school_id', dataController.findBySchoolId);

// Update a teacher with id
//router.put('/:id', dataController.update);

// Delete a teacher with id
//router.delete('/:id', dataController.delete);

module.exports = router
