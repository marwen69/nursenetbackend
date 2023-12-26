const mongoose = require('mongoose');

const medicalAdministrationSchema = new mongoose.Schema({
    poids: Number,
    medicin: String,
    prescription: String,
    nomMedicament: String,
    dateDuSemain: Date,
    time: String,
    matin: Boolean,
    apresMidi: Boolean,
    soir: Boolean,
    remarqueInfermier: String,
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
});


const MedicalAdministration = mongoose.model('MedicalAdministration', medicalAdministrationSchema);

module.exports = MedicalAdministration;
