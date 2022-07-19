// Author: Harsh Hariramani

const db = require("../models");
const Vehicle = db.vehicle;

exports.form = (req, res) => {
    const vehicle = new Vehicle({
        brand: req.body.brand,
        model: req.body.model,
        dealer: req.body.dealer,
        customer: req.body.customer,
        email: req.body.email
    });
    vehicle.save((err, data) => {
        if (err) {
            res.status(400).send({message: err});
            return;
        }
        res.status(201).send({
          success: true,
          message: 'Your requirements have been submitted to the dealer',
          details: req.body
      });
    });
};

exports.getVehicle = (req, res) => {
    Vehicle.find().exec((err, vehicle) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        success: true,
        message: "List retrieved",
        list: vehicle
      });
    });
  };

exports.updateRequirements = (req, res) => {
  Vehicle.findByIdAndUpdate(req.params.id, {
    ...req.body,
  }).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!data) {
      res.status(404).json({ message: "Requirements not found." });
      return;
    }
    res.status(200).send({ message: " Requirement details were updated" });
  });
};  


exports.deleteRequirements = (req, res) => {
  Vehicle.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!data) {
      res.status(404).json({ message: "Could not delete requirements" });
      return;
    }
    res.status(200).send({ message: " Requirements were deleted" });
  });
};



