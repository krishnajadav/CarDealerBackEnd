//Author: Leah Isenor
//Controller for the trade in feature
const { model } = require("mongoose");
const db = require("../models");
const TradeInCars = db.tradeInCars;

exports.getOptions = (req, res) => {
    TradeInCars.find().exec((err, tradeInCars) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        var formattedTradeInCars = format(tradeInCars);
        res.status(200).send(formattedTradeInCars);
    });
}

exports.getEstimate = (req, res) => {
    var id = req.params.vehicleid;
    var year = req.query.year;
    var km = req.query.km;
    TradeInCars.findById(id).exec((err, tradeInCar) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        var estimate = caculateEstimate(tradeInCar.price,year,km);
        res.status(200).send({estimate : estimate});
    });
}

const caculateEstimate = (price,year,km) => {
    var value = price;
    var age = new Date().getFullYear() - year;
    var kmyear = km/age;
    var standardkm = 20000;
    for (i = 0; i < age; i++) {
        var standard = 0.2 * value;
        var extra = 0.01 * value * (kmyear - standardkm)/10000;
        value = value - standard - extra;
    }
    return value.toFixed(2);
}

const format = (cars) => {
    const makes = {};
    for (let car of cars) {
        if (!makes[car.make]){
            makes[car.make] = {};
        }
        makes[car.make][car.model] = {
            id : car["_id"]
        };
    }
    return makes;
}