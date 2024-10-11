var express = require('express');
var router = express.Router();
const Bill = require('../models/BillModel');

// GET all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('userID locationID promoID');
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new bill
router.post('/', async (req, res) => {
  const bill = new Bill({
    userID: req.body.userID,
    locationID: req.body.locationID,
    promoID: req.body.promoID,
    total: req.body.total
  });
  try {
    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a bill
router.delete('/:id', async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bills for a specific user
router.get('/users/:id/bills', async (req, res) => {
  try {
    const bills = await Bill.find({ userID: req.params.id });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bills for a specific location
router.get('/locations/:id/bills', async (req, res) => {
  try {
    const bills = await Bill.find({ locationID: req.params.id });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
