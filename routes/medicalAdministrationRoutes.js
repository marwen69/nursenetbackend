// routes/medicalAdministrationRoutes.js
const express = require('express');
const router = express.Router();
const medicalAdministrationController = require('../controllers/medicalAdministrationcontroller');

// Create a new medical administration record
router.post('/medicaladministrations', medicalAdministrationController.createMedicalAdministration);

// Get all medical administration records for a patient
router.get('/medicaladministrations/:patientId', medicalAdministrationController.getAllMedicalAdministrationsForPatient);

// Get a specific medical administration record by ID
router.get('/medicaladministrations/:medicalAdministrationId', medicalAdministrationController.getMedicalAdministrationById);

// Update a medical administration record
router.put('/medicaladministrations/:medicalAdministrationId', medicalAdministrationController.updateMedicalAdministration);

// Delete a medical administration record
router.delete('/medicaladministrations/:medicalAdministrationId', medicalAdministrationController.deleteMedicalAdministration);

module.exports = router;
