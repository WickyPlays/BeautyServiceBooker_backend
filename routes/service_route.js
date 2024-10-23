var express = require("express");
var router = express.Router();
const Service = require("../models/ServiceModel");
const auth = require("../middlewares/auth_middleware.js");

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({data: services});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new service
router.post(
  "/create-service",
  auth,
  async (req, res) => {
    const service = new Service({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      duration: req.body.duration,
      image: req.body.image,
      gender: req.body.gender
    });
    try {
      const newService = await service.save();
      res.status(200).json(newService);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// PUT update a service
router.put(
  "/update-serivce/:id",
  auth,
  async (req, res) => {
    try {
      const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ message: "Service updated" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// DELETE a service
router.delete(
  "/delete-service/:id",
  auth,
  async (req, res) => {
    try {
      await Service.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Service deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);



// GET services for a specific location
// router.get('/locations/:id/services', async (req, res) => {
//   try {
//     const services = await Service.find({ locationID: req.params.id });
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
