// models/block.js
const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ]
});

const Block = mongoose.model('Block', blockSchema);

module.exports = Block;