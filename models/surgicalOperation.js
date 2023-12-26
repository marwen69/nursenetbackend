const mongoose = require('mongoose');

const surgicalOperationSchema = new mongoose.Schema({
    preOperative: {
        type: {
            date: Date,
            lieu: String,
            initials: String,
        },
        default: {},
    },
    drains: {
        type: {
            type: String,
            aspiration: String,
            remaque: String,
            enPlace: {
                init: Date,
                installe: Date,
                enleve: Date,
            },
        },
        default: {},
    },
    postOperative: {
        type: {
            soin: String,
            date: Date,
            lieu: String,
            initials: String,
        },
        default: {},
    },
    observations: String,
    
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true, // Add this line if a surgical operation must be associated with a patient
      },

});
const SurgicalOperation = mongoose.model('SurgicalOperation', surgicalOperationSchema);

module.exports = SurgicalOperation;