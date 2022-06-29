const express = require('express')
const router = express.Router()
const pointController = require('../controllers/point.controller');

// Retrieve all user points
router.get('/:user_id', pointController.findByUserId);

// Create a new points record
router.post('/', pointController.create);

// Update a points with id
router.put('/:id', pointController.update);

module.exports = router
