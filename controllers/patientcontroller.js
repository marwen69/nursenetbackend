// controllers/patientController.js
const Patient = require('../models/patient.js');
const Room = require('../models/room');
const Block = require('../models/block.js'); // Add this line to import the Block model

exports.createPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      blocId,
      admissionDate,
      maritalStatus,
      educationLevel,
      medicalData,
      clinicalParticulars,
      surveillanceElements,
      roomId,
    } = req.body;

    // Check if the room exists and has available beds
    const selectedRoom = await Room.findById(roomId)
      .populate({
        path: 'block',
        model: 'Block',
      })
      .populate('beds')
      .exec();

    if (!selectedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (selectedRoom.patients.length >= selectedRoom.beds.length) {
      return res.status(400).json({ error: 'No available beds in the room' });
    }

    // Find the available beds
    const availableBeds = selectedRoom.beds.filter(
      (bed) => !selectedRoom.patients.some((patient) => patient.bed === bed.bedNumber)
    );

    if (availableBeds.length === 0) {
      return res.status(400).json({ error: 'No available beds in the room' });
    }

    // Choose a random available bed
    const randomBed = availableBeds[Math.floor(Math.random() * availableBeds.length)];

    console.log('Assigned bed number:', randomBed.bedNumber);

    const newPatient = new Patient({
      firstName,
      lastName,
      age,
      gender,
      bloc: blocId,
      admissionDate,
      maritalStatus,
      educationLevel,
      medicalData,
      clinicalParticulars,
      surveillanceElements,
      room: selectedRoom._id,
      bed: randomBed.bedNumber,
    });

    const savedPatient = await newPatient.save();

    // Update the associated room's patients array
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $push: { patients: savedPatient._id } },
      { new: true, runValidators: true }
    );

    // Update the associated block's patients array
    const updatedBlock = await Block.findByIdAndUpdate(
      blocId,
      { $push: { patients: savedPatient._id } },
      { new: true, runValidators: true }
    );

    if (!updatedRoom || !updatedBlock) {
      return res.status(404).json({ error: 'Room or Block not found' });
    }

    res.status(201).json({
      message: 'Patient created successfully',
      patient: {
        ...savedPatient.toObject(),
        bed: randomBed.bedNumber,
        block: updatedRoom.block,
        room: updatedRoom,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Delete a specific patient
exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    
    // Find the patient to get the associated room
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const roomId = patient.room;

    const deletedPatient = await Patient.findByIdAndRemove(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Remove the patient's _id from the associated room's patients array
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $pull: { patients: patientId } }, // Remove the patient's _id from the patients array
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully', patient: deletedPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//get the bed for the patient

exports.getBed = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(patient.bed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


//get the patient by room and blcok

exports.getPatientByRoomAndBloc = async (req, res) => {
  try {
    const blocId = req.params.blocId;
    const roomId = req.params.roomId;

    const patient = await Patient.find({ room: roomId, bloc: blocId });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Get all information about all patients
exports.getAllPatientsDetails = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate({
        path: 'room',
        model: 'Room',
        populate: {
          path: 'block',
          model: 'Block',
        },
      })
      .exec();

    const patientsDetails = patients.map(patient => {
      if (!patient.room || !patient.room.block) {
        return null; // or handle as needed
      }

      return {
        _id: patient._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        age: patient.age,
        matricule: patient.matricule,
        gender: patient.gender,
        admissionDate: patient.admissionDate,
        maritalStatus: patient.maritalStatus,
        educationLevel: patient.educationLevel,
        medicalData: patient.medicalData,
        clinicalParticulars: patient.clinicalParticulars,
        surveillanceElements: patient.surveillanceElements,
        room: {
          _id: patient.room._id,
          roomNumber: patient.room.roomNumber,
          block: patient.room.block ? {
            _id: patient.room.block._id,
            blockName: patient.room.block.name,
          } : null,
        },
        bed: patient.bed,
        surgicalOperation: patient.surgicalOperation,
      };
    }).filter(patient => patient !== null); // Filter out null values

    res.status(200).json(patientsDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
