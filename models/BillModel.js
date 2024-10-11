const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    locationID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    promoID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'PromoCode' 
    },
    total: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);
