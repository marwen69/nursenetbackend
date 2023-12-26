const Room = require('../models/room');
const Block = require('../models/block');

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, capacity, blockId } = req.body;

    // Create a new room
    const newRoom = new Room({ roomNumber, capacity, block: blockId });

    // Save the room
    await newRoom.save();

    // Update the associated block's rooms array
    const updatedBlock = await Block.findByIdAndUpdate(
      blockId,
      { $push: { rooms: newRoom._id } }, // Add the new room's _id to the rooms array
      { new: true, runValidators: true }
    );

    if (!updatedBlock) {
      return res.status(404).json({ error: 'Block not found' });
    }

    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('block');
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId).populate('block');

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update room details
exports.updateRoom = async (req, res) => {
  try {
    const { roomNumber, capacity } = req.body;
    const roomId = req.params.roomId;

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { roomNumber, capacity },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Find the room and its associated block
    const room = await Room.findById(roomId);
    const block = await Block.findById(room.block);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Remove the room from the block's rooms array
    block.rooms.pull(roomId);
    await block.save();

    // Delete the room
    await Room.findByIdAndDelete(roomId);

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all rooms by bloc
exports.getAllRoomsByBloc = async (req, res) => {
  try {
    const blocId = req.params.blocId;

    // Find the bloc and populate its rooms array
    const bloc = await Block.findById(blocId).populate('rooms');

    if (!bloc) {
      return res.status(404).json({ error: 'Bloc not found' });
    }

    const rooms = bloc.rooms;

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
