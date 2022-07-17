// Author: Leah Isenor
//model for trade in car options
const mongoose = require("mongoose");

const TradeInCars = mongoose.model(
    "TradeInCars",
    new mongoose.Schema({
        make: {
            required: true,
            type: String
        },
        model: {
            required: true,
            type: String
        },
        price: {
            required: true,
            type: mongoose.Schema.Types.Number
        }
    })
);
module.exports = TradeInCars;