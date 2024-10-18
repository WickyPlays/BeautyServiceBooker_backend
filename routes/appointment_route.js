var express = require('express');
var router = express.Router();
const Appointment = require('../models/AppointmentModel');

// POST create a new appointment
router.post('/create-appointment', async (req, res) => {
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

// GET all appointments with detailed information
router.get('/', async (req, res) => {
  try {
    const appointment = await Appointment.find()
      .populate('userID', 'name') // Populate user name
      .populate('serviceID', 'name price') // Populate service name and price
      .populate('stylistID', 'name'); // Populate stylist name

    const detailedAppointments = appointment.map(appointment => ({
      id: appointment._id,
      serviceName: appointment.serviceID.name,
      userName: appointment.userID.name,
      stylistName: appointment.stylistID.name,
      price: appointment.serviceID.price,
      appointmentDate: appointment.appointmentDate,
      status: appointment.status
    }));

    res.json(detailedAppointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single appointment by ID with detailed information
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('userID', 'name') // Populate user name
      .populate('serviceID', 'name') // Populate service name and price
      .populate('stylistID', 'name'); // Populate stylist name

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const detailedAppointment = {
      serviceName: appointment.serviceID.name,
      userName: appointment.userID.name,
      stylistName: appointment.stylistID.name,
      price: appointment.serviceID.price,
      appointmentDate: appointment.appointmentDate,
      status: appointment.status
    };

    res.json(detailedAppointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update an appointment
router.patch('/approve-appointment/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.status === 'approved') {
      return res.status(400).json({ message: 'Appointment is already approved and cannot be updated' });
    }

    appointment.status = req.body.status;
    const updatedAppointment = await appointment.save();
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