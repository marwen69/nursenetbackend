// routes/nurseRoutes.js
const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nursecontroller');

// Routes for Nurse operations

// Get all nurses
router.get('/nurses', nurseController.getAllNurses);

// Get a specific nurse by ID
router.get('/nurses/nurses/:id', nurseController.getNurseById);

// Create a new nurse
router.post('/register', nurseController.createNurse);

// Update a nurse by ID
router.put('/nurses/:id', nurseController.updateNurse);

// Delete a nurse by ID
router.delete('/nurses/:id', nurseController.deleteNurse);

// Login route
router.post('/loginnurses', nurseController.loginNurse);



module.exports = router;
