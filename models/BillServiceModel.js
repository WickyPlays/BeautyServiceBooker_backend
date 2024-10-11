const mongoose = require("mongoose");

const billServiceSchema = new mongoose.Schema(
  {
    billID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
      required: true,
    },
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  {
    _id: false, // Disabling _id since it's a composite primary key
  }
);

billServiceSchema.index({ billID: 1, serviceID: 1 }, { unique: true });

module.exports = mongoose.model("BillService", billServiceSchema);
