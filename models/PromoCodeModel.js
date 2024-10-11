const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    locationID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    code: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true },
    is_used: { type: Boolean, default: false }
});

module.exports = mongoose.model('PromoCode', promoCodeSchema);
