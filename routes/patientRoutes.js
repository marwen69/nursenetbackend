const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientcontroller.js'); 

// Create a new patient
router.post('/patientsadd', patientController.createPatient);

// Get details of a specific patient
router.get('/patients/:patientId', patientController.getPatientById);

// Get a list of all patients
router.get('/patients', patientController.getAllPatients);


// Update the delete route to use matricule
router.delete('/deleatpatients/:matricule', patientController.deletePatient);


// get the bed for a specific patient
router.get('/getbed/:patientId', patientController.getBed);

// getPatientByRoomAndBloc
router.get('/getPatientByRoomAndBloc/:roomId/:blocId', patientController.getPatientByRoomAndBloc);



// Get all information about patients
router.get('/allPatientsDetails', patientController.getAllPatientsDetails); // Corrected route path

module.exports = router;
