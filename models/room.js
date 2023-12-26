const mongoose = require('mongoose');
const Block = require('./block');
const Patient = require('./patient');

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        default: 1,
    },
    beds: [
        {
            bedNumber: {
                type: String, // Assuming bed numbers can be alphanumeric (e.g., 'lit101', 'lit101A')
                required: true,
            }, 
        },
    ],

    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }
    ],
    block: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Block',
        required: true,
    },
});

// Add a hook to generate bed numbers based on the room capacity
roomSchema.pre('save', function (next) {
    if (!this.beds || this.beds.length === 0) {
        // Generate bed numbers if the beds array is empty
        for (let i = 1; i <= this.capacity; i++) {
            const bedNumber = `lit${this.roomNumber}${String.fromCharCode(64 + i)}`;
            this.beds.push({ bedNumber });
        }
    }
    next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
