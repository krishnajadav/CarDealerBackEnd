// Author: Tuan Hamid
const mongoose = require("mongoose");
const Accessory = mongoose.model(
    "Accessory",
    new mongoose.Schema({
        image:String,
        name:String,
        description: String,
        category: String,
        price: Number,
        quantity: Number
    })
);
module.exports = Accessory;
