//Author: Leah Isenor
//Model for cars used in the test drive booking feature
//The following was referenced to understand the syntax for declaring a schema
//https://mongoosejs.com/docs/guide.html
const mongoose = require("mongoose");
const TestDriveCars = mongoose.model(
    "testdrivecars",
    new mongoose.Schema({
        name: String
    })
);
module.exports = TestDriveCars;
