// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomcontroller');

// Create a new room
router.post('/roomsadd', roomController.createRoom);

// Get details of a specific room
router.get('/rooms/:roomId', roomController.getRoomById);

// Get a list of all rooms
router.get('/rooms', roomController.getAllRooms);

// Update details of a specific room
router.put('/rooms/:roomId', roomController.updateRoom);

// Delete a specific room
router.delete('/rooms/:roomId', roomController.deleteRoom);

// Get all rooms by bloc
router.get('/roomsbybloc/:blocId', roomController.getAllRoomsByBloc);



module.exports = router;
