//Author: Leah Isenor
//model for the test drive appointments in the test drive booking feature
//The following was referenced to understand the syntax for declaring a schema
//https://mongoosejs.com/docs/guide.html
const mongoose = require("mongoose");
const TestDrives = mongoose.model(
    "testdrives",
    new mongoose.Schema({
        car: String,
        date: String,
        time: String,
        userId: mongoose.Schema.Types.ObjectId
    })
);
module.exports = TestDrives;
