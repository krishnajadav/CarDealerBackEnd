// Author: Harsh Hariramani

const mongoose = require("mongoose");

const Vehicle = mongoose.model(
    "Vehicle",
    new mongoose.Schema({
        brand:String,
        model:String,
        dealer:String
    })
);
module.exports = Vehicle;