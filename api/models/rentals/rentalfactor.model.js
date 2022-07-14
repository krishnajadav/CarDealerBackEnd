//Author: Elizabeth James
//Model for the rentals feature
const mongoose = require("mongoose");
const Rentalfactor = mongoose.model(
    "rentalfactors",
    new mongoose.Schema({
        daysAway:Number,
        factor:Number
    })
);
module.exports = Rentalfactor;