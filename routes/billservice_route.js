var express = require('express');
var router = express.Router();
const BillService = require('../models/BillServiceModel');

// GET services for a specific bill
router.get('/:id/services', async (req, res) => {
  try {
    const services = await BillService.find({ billID: req.params.id }).populate('serviceID');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add services to a bill
router.post('/:id/services', async (req, res) => {
  const billService = new BillService({
    billID: req.params.id,
    serviceID: req.body.serviceID
  });
  try {
    const newBillService = await billService.save();
    res.status(201).json(newBillService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a service from a bill
router.delete('/:id/services/:serviceID', async (req, res) => {
  try {
    await BillService.deleteOne({ billID: req.params.id, serviceID: req.params.serviceID });
    res.json({ message: 'Service removed from bill' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
