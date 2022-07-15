/*
Author: Krishna Sanjaybhai Jadav(krishna.jadav@dal.ca)
*/
const mongoose = require("mongoose");
const Inventory = mongoose.model(
    "Inventory",
    new mongoose.Schema({
        vehicleName:String,
        vehicleModelNumber:String,
        companyName: String,
        vehiclePrice: String,
        vehicleImageURL:String,
        eligibleForLoan:Boolean,
        eligibleForRent: Boolean,
        vehicleSeatCount: String,
        vehicleRating: Number
    })
);
module.exports = Inventory;
