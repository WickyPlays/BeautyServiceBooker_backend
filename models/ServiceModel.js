const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['barber', 'facial', 'massage', 'hair care', "package"], 
        required: true 
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },  // Duration in seconds
    image: {type: String, required: true},
    gender: { 
        type: String, 
        enum: ['male', 'female', 'both'], 
        required: true 
    }
});

module.exports = mongoose.model('Service', serviceSchema);
