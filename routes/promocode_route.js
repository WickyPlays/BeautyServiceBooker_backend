var express = require('express');
var router = express.Router();
const PromoCode = require('../models/PromoCodeModel');

// GET all promo codes
router.get('/', async (req, res) => {
  try {
    const promocodes = await PromoCode.find().populate('locationID');
    res.json(promocodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single promo code by ID
router.get('/:id', async (req, res) => {
  try {
    const promocode = await PromoCode.findById(req.params.id).populate('locationID');
    if (!promocode) return res.status(404).json({ message: 'Promo code not found' });
    res.json(promocode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new promo code
router.post('/', async (req, res) => {
  const promoCode = new PromoCode({
    locationID: req.body.locationID,
    code: req.body.code,
    percentage: req.body.percentage
  });
  try {
    const newPromoCode = await promoCode.save();
    res.status(201).json(newPromoCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update promo code
router.put('/:id', async (req, res) => {
  try {
    const updatedPromoCode = await PromoCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPromoCode);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE promo code
router.delete('/:id', async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.json({ message: 'Promo code deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET promo codes for a specific location
router.get('/locations/:id/promocodes', async (req, res) => {
  try {
    const promocodes = await PromoCode.find({ locationID: req.params.id });
    res.json(promocodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
