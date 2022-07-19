/*
Author: Adarsh Kannan Iyengar
Controllers for Dealer Service Booking Management feature
*/
const db = require("../models");
const DealerService = db.dealerService;

exports.updateTimeSlot = (req, res) => {
  const dealerservice = new DealerService({
    ...req.body,
  });
  dealerservice.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(data);
    res.status(201).json({ message: "Updated Time Slot!", data: data });
  });
};
