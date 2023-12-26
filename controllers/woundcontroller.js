const Wound = require('../models/wound');

const getAllWounds = async (req, res) => {
    try {
        const wounds = await Wound.find();
        res.json(wounds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWoundById = async (req, res) => {
    try {
        const wound = await Wound.findById(req.params.id);
        if (wound) {
            res.json(wound);
        } else {
            res.status(404).json({ message: 'Wound not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWound = async (req, res) => {
    const woundData = req.body;

    try {
        const newWound = await Wound.create(woundData);
        res.status(201).json(newWound);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateWound = async (req, res) => {
    try {
        const wound = await Wound.findById(req.params.id);
        if (wound) {
            Object.assign(wound, req.body);
            const updatedWound = await wound.save();
            res.json(updatedWound);
        } else {
            res.status(404).json({ message: 'Wound not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWound = async (req, res) => {
    try {
        const wound = await Wound.findById(req.params.id);
        if (wound) {
            await wound.remove();
            res.json({ message: 'Wound deleted' });
        } else {
            res.status(404).json({ message: 'Wound not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllWounds,
    getWoundById,
    createWound,
    updateWound,
    deleteWound,
};
