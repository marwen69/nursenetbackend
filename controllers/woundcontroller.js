const Wound = require('../models/wound');
const Patient = require('../models/patient');

// Create a new Wound record
exports.createWound = async (req, res) => {
  try {
    const { patientId, ficheSuivi, evaluationInitiale, apparancePlaie, peauPourtour, ecoulement, materielEnPlace, nettoyage, pansement } = req.body;

    // Check if patientId is provided
    if (!patientId) {
        return res.status(400).json({ error: 'Invalid patient ID' });
      }
  
      // Check if patient exists
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

    // Create a new Wound instance
    const wound = new Wound({
    
      ficheSuivi,
      evaluationInitiale,
      apparancePlaie,
      peauPourtour,
      ecoulement,
      materielEnPlace,
      nettoyage,
      pansement,
      patient: patientId
    });

    // Save the Wound record
    await wound.save();

    res.status(201).json({
      message: 'Wound record created successfully',
      wound,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get details of a Wound record by ID
exports.getWoundById = async (req, res) => {
  try {
    const woundId = req.params.woundId;
    const wound = await Wound.findById(woundId);

    if (!wound) {
      return res.status(404).json({ error: 'Wound record not found' });
    }

    res.status(200).json(wound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update details of a Wound record by ID
exports.updateWound = async (req, res) => {
  try {
    const woundId = req.params.woundId;
    const woundData = req.body;

    const updatedWound = await Wound.findByIdAndUpdate(woundId, woundData, { new: true, runValidators: true });

    if (!updatedWound) {
      return res.status(404).json({ error: 'Wound record not found' });
    }

    res.status(200).json({
      message: 'Wound record updated successfully',
      wound: updatedWound,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a Wound record by ID
exports.deleteWound = async (req, res) => {
  try {
    const woundId = req.params.woundId;

    // Check if woundId is provided
    if (!woundId) {
      return res.status(400).json({ error: 'Invalid Wound ID' });
    }

    const deletedWound = await Wound.findByIdAndDelete(woundId);

    if (!deletedWound) {
      return res.status(404).json({ error: 'Wound record not found' });
    }

    res.status(200).json({
      message: 'Wound record deleted successfully',
      wound: deletedWound,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all Wound records for a specific patient
exports.getAllWounds = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Check if patientId is provided
    if (!patientId) {
      return res.status(400).json({ error: 'Invalid patient ID' });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const wounds = await Wound.find({ patient: patientId });

    res.status(200).json(wounds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
