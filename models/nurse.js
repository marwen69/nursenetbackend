// models/nurse.js
const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        default: 0
    },
    profileImage: String,
    status: {
        type: String,
        enum: ['in work', 'absent'],
        default: 'in work'
    }
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;
