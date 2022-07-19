// Author: Harsh Hariramani

const mongoose = require("mongoose");

const Vehicle = mongoose.model(
    "Vehicle",
    new mongoose.Schema({
        brand: {
            required: true,
            type: String
        },
        model: {
            required: true,
            type: String
        },
        dealer: {
            required: true,
            type: String
        },
        customer: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        }
    })
);
module.exports = Vehicle;