var express = require('express');
var router = express.Router();
const Service = require('../models/ServiceModel');

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('locationID');
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new service
router.post('/', async (req, res) => {
  const service = new Service({
    locationID: req.body.locationID,
    type: req.body.type,
    price: req.body.price,
    duration: req.body.duration
  });
  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a service
router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a service
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET services for a specific location
router.get('/locations/:id/services', async (req, res) => {
  try {
    const services = await Service.find({ locationID: req.params.id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
