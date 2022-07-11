const mongoose = require("mongoose");
const Inventory = mongoose.model(
    "Inventory",
    new mongoose.Schema({
        vehicleName:String,
        vehicleModelNumber:String,
        companyName: String,
        vehiclePrice: String
    })
);
module.exports = Inventory;
