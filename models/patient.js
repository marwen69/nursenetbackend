const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    matricule: {
        type: Number,
        default: function () {
            return Math.floor(100000 + Math.random() * 900000);
        },
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
       
    },
    bloc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block',
        required: true,
    },
    admissionDate: {
        type: Date,
        default: Date.now,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    maritalStatus: {
        type: String,
        // You might want to add validation or enum values here
    },
    educationLevel: {
        type: String,
        // You might want to add validation or enum values here
    },
    medicalData: {
        diagnostic: String,
        personalHistory: String,
        familyHistory: String,
    },
    clinicalParticulars: {
        allergy: {
            type: Boolean,
            default: false,
        },
        allergyDescription: {
            type: String,
        },
        surgicalHistory: {
            type: Boolean,
            default: false,
        },
        surgicalDescription: {
            type: String,
        },
    },
    surveillanceElements: {
        vitalSigns: {
            bloodPressure: String,
            pulse: Number,
            respiratoryRate: Number,
            temperature: Number,
            spO2: Number,
        },
        alerts: {
            weight: Number,
            height: Number,
            BMI: Number,
            observations: String,
        },
    },
   
    surgicalOperation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurgicalOperation',
    },

    medicalAdministration: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurgicalOperation',
    },
    wound: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'woundSchema',
    },

    
    
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
