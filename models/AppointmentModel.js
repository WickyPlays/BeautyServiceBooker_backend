const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
    stylistID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    appointmentDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);