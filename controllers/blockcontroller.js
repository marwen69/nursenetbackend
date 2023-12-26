// controllers/blockController.js
const Block = require('../models/block');
const Room = require('../models/room');


// Handle the creation of a new block
exports.createBlock = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if a block with the same name already exists
    const existingBlock = await Block.findOne({ name });

    if (existingBlock) {
      // If a block with the same name exists, return an error
      return res.status(400).json({ error: 'A block with the same name already exists' });
    }

    // If the block doesn't exist, create a new one
    const newBlock = new Block({ name, description });
    await newBlock.save();

    res.status(201).json({ message: 'Block created successfully', block: newBlock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get details of a specific block
exports.getBlockById = async (req, res) => {
  try {
    const block = await Block.findById(req.params.blockId).populate('rooms');
    
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }

    res.status(200).json(block);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a list of all blocks
exports.getAllBlocks = async (req, res) => {
  try {
    const blocks = await Block.find().populate('rooms');
    res.status(200).json(blocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update details of a specific block
exports.updateBlock = async (req, res) => {
  try {
    const { name, description} = req.body;
    const blockId = req.params.blockId;

    // Find the existing block by ID
    const existingBlock = await Block.findById(blockId);

    if (!existingBlock) {
      return res.status(404).json({ error: 'Block not found' });
    }

    // Check if the name is being updated and if it's different from the existing name
    if (name && name !== existingBlock.name) {
      // Check if a block with the new name already exists
      const blockWithNewName = await Block.findOne({ name });

      if (blockWithNewName) {
        return res.status(400).json({ error: 'A block with the new name already exists' });
      }
    }

    // Update the block details
    const updatedBlock = await Block.findByIdAndUpdate(
      blockId,
      { name, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Block updated successfully', block: updatedBlock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete a specific block
exports.deleteBlock = async (req, res) => {
  try {
    const blockId = req.params.blockId;

    // Check if there are any rooms associated with the block
    const roomsCount = await Room.countDocuments({ block: blockId });

    if (roomsCount > 0) {
      // If there are rooms, respond with an alert message
      return res.status(400).json({ error: 'Cannot delete block. Remove all rooms first.' });
    }

    // If no rooms are associated, proceed to delete the block
    const deletedBlock = await Block.findByIdAndDelete(blockId);

    if (!deletedBlock) {
      return res.status(404).json({ error: 'Block not found' });
    }

    res.status(200).json({ message: 'Block deleted successfully', block: deletedBlock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
