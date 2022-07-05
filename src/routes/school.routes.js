const express = require('express')
const router = express.Router()
const schoolController = require('../controllers/school.controller');

// Retrieve all templates
router.get('/', schoolController.findAll);

// Create a new template
router.post('/', schoolController.create);

// Retrieve a single template with id
router.get('/:id', schoolController.findById);

// Update a template with id
router.put('/:id', schoolController.update);

module.exports = router
