/*
Author: Adarsh Kannan Iyengar
Controller for Customer Service Booking feature
*/
const db = require("../models");
const CustomerService = db.customerService;

exports.createBooking = (req, res) => {
  const customerservice = new CustomerService({
    ...req.body,
  });
  customerservice.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(data);
    res.status(201).json({ message: "Booked Appointment!!", data: data });
  });
};

exports.viewBooking = (req, res) => {
  CustomerService.find().exec((err, customerService) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(customerService);
  });
};

exports.updateBooking = (req, res) => {
  CustomerService.findByIdAndUpdate(req.params.id, {
    ...req.body,
  }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!data) {
      res.status(404).json({ message: "Customer Not found." });
      return;
    }
    res.status(200).send({ message: " Customer booking details updated" });
  });
};

exports.deleteBooking = (req, res) => {
  CustomerService.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!data) {
      res.status(404).json({ message: "Could not delete." });
      return;
    }
    res.status(200).send({ message: " Customer booking details deleted" });
  });
};
