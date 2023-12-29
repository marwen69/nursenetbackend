const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockcontroller.js');

// Create a new block
router.post('/blocksadd', blockController.createBlock);

// Get details of a specific block by ID
router.get('/blocks/:blockId', blockController.getBlockById);

// Get a list of all blocks
router.get('/blocks', blockController.getAllBlocks);

// Update details of a specific block by ID
router.put('/blocks/:blockId', blockController.updateBlock);

// Delete a specific block by ID
router.delete('/blocks/:blockId', blockController.deleteBlock);

module.exports = router;
