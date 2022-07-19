/*
Author: Adarsh Kannan Iyengar
Model for Dealer Service Booking Management feature
*/
const mongoose = require("mongoose");
const DealerServiceSchema = new mongoose.Schema({
  timeSlotFrom: {
    type: String,
  },
  timeSlotTill: {
    type: String,
  },
  date: {
    type: String,
  },
  location: {
    type: String,
  },
});

const DealerService = mongoose.model("DealerService", DealerServiceSchema);
module.exports = DealerService;
