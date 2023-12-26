// routes/surgicalOperationRoutes.js
const express = require('express');
const router = express.Router();
const surgicalOperationController = require('../controllers/surgicalOperationController');

// Create a new SurgicalOperation for a specific patient
router.post('/patients/:patientId/surgicalOperations', surgicalOperationController.createSurgicalOperation);

// Get all SurgicalOperations for a specific patient
router.get('/patients/:patientId/surgicalOperations', surgicalOperationController.getAllSurgicalOperations);


// Get details of a specific SurgicalOperation
router.get('/surgicalOperations/:surgicalOperationId', surgicalOperationController.getSurgicalOperationById);

// Update details of a specific SurgicalOperation
router.put('/surgicalOperations/:surgicalOperationId', surgicalOperationController.updateSurgicalOperation);

// Delete a specific SurgicalOperation
router.delete('/surgicalOperations/:surgicalOperationId', surgicalOperationController.deleteSurgicalOperation);


// Get all surgical operation records for a specific patient
router.get('/patients/:patientId/surgicalOperations/records', surgicalOperationController.getAllSurgicalOperationRecords);


module.exports = router;
