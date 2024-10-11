var express = require('express');
var router = express.Router();
const Location = require('../models/LocationModel');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new location
router.post('/', async (req, res) => {
  const location = new Location({
    name: req.body.name,
    address: req.body.address,
    type: req.body.type
  });
  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update location
router.put('/:id', async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE location
router.delete('/:id', async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
