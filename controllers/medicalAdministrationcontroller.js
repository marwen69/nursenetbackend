// controllers/medicalAdministrationController.js
const MedicalAdministration = require('../models/medicalAdministration');
const Patient  = require('../models/patient');

// Create a new medical administration record
exports.createMedicalAdministration = async (req, res) => {
    try {
        const {
            poids,
            medicin,
            prescription,
            nomMedicament,
            dateDuSemain,
            time,
            matin,
            apresMidi,
            soir,
            remarqueInfermier,
            patientId,
        } = req.body;

        // Check if the provided patientId is valid
        const existingPatient = await Patient.findById(patientId);
        if (!existingPatient) {
            return res.status(400).json({ error: 'Invalid patientId' });
        }

        const newMedicalAdministration = new MedicalAdministration({
            poids,
            medicin,
            prescription,
            nomMedicament,
            dateDuSemain,
            time,
            matin,
            apresMidi,
            soir,
            remarqueInfermier,
            patient: patientId,
        });

        const savedMedicalAdministration = await newMedicalAdministration.save();

        res.status(201).json({
            message: 'Medical administration record created successfully',
            medicalAdministration: savedMedicalAdministration,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all medical administration records for a patient
exports.getAllMedicalAdministrationsForPatient = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const medicalAdministrations = await MedicalAdministration.find({ patient: patientId });

        res.status(200).json(medicalAdministrations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific medical administration record by ID
exports.getMedicalAdministrationById = async (req, res) => {
    try {
        const medicalAdministrationId = req.params.medicalAdministrationId;
        const medicalAdministration = await MedicalAdministration.findById(medicalAdministrationId);

        if (!medicalAdministration) {
            return res.status(404).json({ error: 'Medical administration record not found' });
        }

        res.status(200).json(medicalAdministration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a medical administration record
exports.updateMedicalAdministration = async (req, res) => {
    try {
        const medicalAdministrationId = req.params.medicalAdministrationId;
        const updateData = req.body;

        const updatedMedicalAdministration = await MedicalAdministration.findByIdAndUpdate(
            medicalAdministrationId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedMedicalAdministration) {
            return res.status(404).json({ error: 'Medical administration record not found' });
        }

        res.status(200).json(updatedMedicalAdministration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a medical administration record
exports.deleteMedicalAdministration = async (req, res) => {
    try {
        const medicalAdministrationId = req.params.medicalAdministrationId;
        const deletedMedicalAdministration = await MedicalAdministration.findByIdAndDelete(medicalAdministrationId);

        if (!deletedMedicalAdministration) {
            return res.status(404).json({ error: 'Medical administration record not found' });
        }

        res.status(200).json({ message: 'Medical administration record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
