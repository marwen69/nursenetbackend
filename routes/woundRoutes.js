const express = require('express');
const router = express.Router();
const woundController = require('../controllers/woundcontroller');

// Create a new Wound record
router.post('/crete', woundController.createWound);

// Get details of a Wound record by ID
router.get('/:woundId', woundController.getWoundById);

// Update details of a Wound record by ID
router.put('/:woundId', woundController.updateWound);

// Delete a Wound record by ID
router.delete('/:woundId', woundController.deleteWound);

// Get all Wound records for a specific patient
router.get('/patient/:patientId', woundController.getAllWounds);

module.exports = router;
