const  SurgicalOperation  = require('../models/surgicalOperation');
const Patient  = require('../models/patient');

// Create a new SurgicalOperation
// Create a new SurgicalOperation
exports.createSurgicalOperation = async (req, res) => {
  try {
    const { preOperative, drains, postOperative, observations, patientId } = req.body;

    // Check if patientId is provided
    if (!patientId) {
      return res.status(400).json({ error: 'Invalid patient ID' });
    }

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Create a new SurgicalOperation instance
    const surgicalOperation = new SurgicalOperation({
      preOperative,
      drains,
      postOperative,
      observations,
      patient: patientId,
    });

    // Save the SurgicalOperation
    await surgicalOperation.save();

    // Assign the created SurgicalOperation to the patient
    patient.surgicalOperation = surgicalOperation._id;
    await patient.save();

    res.status(201).json({
      message: 'SurgicalOperation created successfully',
      surgicalOperation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get details of a SurgicalOperation by ID
exports.getSurgicalOperationById = async (req, res) => {
  try {
    const surgicalOperationId = req.params.surgicalOperationId;
    const surgicalOperation = await SurgicalOperation.findById(surgicalOperationId);

    if (!surgicalOperation) {
      return res.status(404).json({ error: 'SurgicalOperation not found' });
    }

    res.status(200).json(surgicalOperation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update details of a SurgicalOperation by ID
exports.updateSurgicalOperation = async (req, res) => {
  try {
    const surgicalOperationId = req.params.surgicalOperationId;
    const surgicalOperationData = req.body;

    const updatedSurgicalOperation = await SurgicalOperation.findByIdAndUpdate(
      surgicalOperationId,
      surgicalOperationData,
      { new: true, runValidators: true }
    );

    if (!updatedSurgicalOperation) {
      return res.status(404).json({ error: 'SurgicalOperation not found' });
    }

    res.status(200).json({
      message: 'SurgicalOperation updated successfully',
      surgicalOperation: updatedSurgicalOperation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a SurgicalOperation by ID
exports.deleteSurgicalOperation = async (req, res) => {
  try {
    const surgicalOperationId = req.params.surgicalOperationId;

    // Check if surgicalOperationId is provided
    if (!surgicalOperationId) {
      return res.status(400).json({ error: 'Invalid SurgicalOperation ID' });
    }

    const deletedSurgicalOperation = await SurgicalOperation.findByIdAndDelete(surgicalOperationId);

    if (!deletedSurgicalOperation) {
      return res.status(404).json({ error: 'SurgicalOperation not found' });
    }

    res.status(200).json({
      message: 'SurgicalOperation deleted successfully',
      surgicalOperation: deletedSurgicalOperation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get all SurgicalOperations for a specific patient
exports.getAllSurgicalOperations = async (req, res) => {
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

    const surgicalOperations = await SurgicalOperation.find({ patient: patientId });

    res.status(200).json(surgicalOperations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get all surgical operation records for a specific patient
exports.getAllSurgicalOperationRecords = async (req, res) => {
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

    const surgicalOperations = await SurgicalOperation.find({ patient: patientId });

    res.status(200).json(surgicalOperations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};