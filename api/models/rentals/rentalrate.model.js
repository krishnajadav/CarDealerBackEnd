//Author: Elizabeth James
//Model for the rentals feature
const mongoose = require("mongoose");
const Rentalrate = mongoose.model(
    "rentalrates",
    new mongoose.Schema({
        day:Number,
        rate:Number
    })
);
module.exports = Rentalrate;