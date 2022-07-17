//Author: Leah Isenor
//Controller for the trade in feature
const db = require("../models");
const TradeInCars = db.tradeInCars;

exports.getOptions = (req, res) => {
    TradeInCars.find().exec((err, tradeInCars) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send(tradeInCars);
    });
}

exports.getEstimate = (req, res) => {
    var id = req.params.vehicleid;
    var year = req.body.year;
    var km = req.body.km;
    TradeInCars.findById(id).exec((err, tradeInCar) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        var estimate = caculateEstimate(tradeInCar.price,year,km);
        console.log(tradeInCar.price);
        res.status(200).send({estimate : estimate});
    });
}

const caculateEstimate = (price,year,km) => {
    var value = price;
    var age = new Date().getFullYear() - year;
    var kmyear = km/age;
    var standardkm = 20000;
    for (i = 0; i < age; i++) {
        var standard = 0.1 * value;
        var extra = 0.05 * (kmyear - standardkm);
        value = value - standard - extra;
    }
    return value.toFixed(2);
}