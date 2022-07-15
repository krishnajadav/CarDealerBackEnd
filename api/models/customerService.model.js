/*
Author: Adarsh Kannan Iyengar
Model for Customer Service Booking feature
*/
const mongoose = require("mongoose");
const CustomerServiceSchema = new mongoose.Schema({
  carModel: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
  },
});

const CustomerService = mongoose.model(
  "CustomerService",
  CustomerServiceSchema
);
module.exports = CustomerService;
