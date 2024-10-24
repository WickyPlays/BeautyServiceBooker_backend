var express = require('express');
var router = express.Router();
const Appointment = require('../models/AppointmentModel');
const Service = require('../models/ServiceModel');

// POST create a new appointment
router.post('/create-appointment', async (req, res) => {
  try {
    // Validate request data
    const { userID, serviceID, stylistID, appointmentDate } = req.body;
    if (!userID || !serviceID || !stylistID || !appointmentDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Fetch the services to calculate the total price
    const services = await Service.find({ '_id': { $in: serviceID } });
    if (services.length !== serviceID.length) {
      return res.status(400).json({ message: 'One or more services not found' });
    }

    const totalPrice = services.reduce((sum, service) => sum + service.price, 0);

    const appointment = new Appointment({
      userID,
      serviceID,
      stylistID,
      appointmentDate,
      price: totalPrice,
      status: 'pending'
    });

    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET all appointments with detailed information
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userID', 'name') // Populate user name
      .populate('serviceID', 'name image price duration') // Populate service names and prices image and duration
      .populate('stylistID', 'name'); // Populate stylist name

      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found' });
      }
  
    const detailedAppointments = appointments.map(appointment => ({
      id: appointment._id,
      services: appointment.serviceID.map(service => ({
        serviceName: service.name,
        image: service.image,
        price: service.price,
        duration: service.duration
      })),
      userName: appointment.userID.name,
      stylistName: appointment.stylistID.name,
      totalPrice: appointment.price,
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
      .populate('serviceID', 'name price') // Populate service names and prices
      .populate('stylistID', 'name'); // Populate stylist name

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    const detailedAppointment = {
      id: appointment._id,
      services: appointment.serviceID.map(service => ({
        serviceName: service.name,
        price: service.price
      })),
      userName: appointment.userID.name,
      stylistName: appointment.stylistID.name,
      totalPrice: appointment.price,
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
router.delete('/delete/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cancel appointment
router.patch('/cancel/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reschedule appointment
router.put('/reschedule/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.appointmentDate = req.body.appointmentDate;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;