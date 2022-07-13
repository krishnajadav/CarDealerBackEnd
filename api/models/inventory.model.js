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
        vehicleSeatCount: String
    })
);
module.exports = Inventory;
