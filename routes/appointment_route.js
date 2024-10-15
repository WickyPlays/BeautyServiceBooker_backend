var express = require('express');
var router = express.Router();
const Appointment = require('../models/AppointmentModel');

// POST create a new appointment
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    userID: req.body.userID,
    serviceID: req.body.serviceID,
    stylistID: req.body.stylistID,
    appointmentDate: req.body.appointmentDate,
    status: 'pending'
  });
  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('userID serviceID stylistID');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('userID serviceID stylistID');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update an appointment
router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;