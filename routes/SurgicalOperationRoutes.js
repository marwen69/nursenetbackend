// routes/surgicalOperationRoutes.js
const express = require('express');
const router = express.Router();
const surgicalOperationController = require('../controllers/surgicalOperationController');

// Create a new SurgicalOperation
router.post('/surgicalOperations', surgicalOperationController.createSurgicalOperation);

// Get details of a SurgicalOperation by ID
router.get('/surgicalOperations/:surgicalOperationId', surgicalOperationController.getSurgicalOperationById);

// Update details of a SurgicalOperation by ID
router.put('/surgicalOperations/:surgicalOperationId', surgicalOperationController.updateSurgicalOperation);

// Delete a SurgicalOperation by ID
router.delete('/surgicalOperations/:surgicalOperationId', surgicalOperationController.deleteSurgicalOperation);

// Get all SurgicalOperations for a specific patient
router.get('/surgicalOperations/:patientId', surgicalOperationController.getAllSurgicalOperations);

// Get all surgical operation records for a specific patient
router.get('/surgicalOperations/getAllRecords/:patientId', surgicalOperationController.getAllSurgicalOperationRecords);

module.exports = router;
