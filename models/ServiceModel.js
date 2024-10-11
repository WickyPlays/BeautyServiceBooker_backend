const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    locationID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['barber', 'facial', 'massage', 'hair care'], 
        required: true 
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }  // Duration in seconds
});

module.exports = mongoose.model('Service', serviceSchema);
