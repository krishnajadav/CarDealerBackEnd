const mongoose = require("mongoose");
const Inventory = mongoose.model(
    "Inventory",
    new mongoose.Schema({
        vehicleName:String,
        vehicleModelNumber:String,
        companyName: String,
        vehiclePrice: Number,
        eligibleForLoan: Boolean,
        eligibleForRent: Boolean, 
        vehicleSeatCount: Number,
        vehicleRating: Number, // dealer inventory can ignore this field for now
        vehicleImageURL: String
    })
);
module.exports = Inventory;
