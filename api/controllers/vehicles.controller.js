const db = require("../models");
const Vehicle = db.vehicle;

exports.form = (req, res) => {
    const vehicle = new Vehicle({
        brand: req.body.brand,
        model: req.body.model,
        dealer: req.body.dealer
    });
    vehicle.save((err, data) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(201).send({message: 'Requirements have been added'});
    });
};

// exports.getVehicle=(res,res)=>{
//     res.send("Hello");
// }

exports.getVehicle = (req, res) => {
    Vehicle.find().exec((err, vehicle) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(vehicle);
    });
  };