//Author: Leah Isenor
//Model for timeslots used in the test drive booking feature
//The following was referenced to understand the syntax for declaring a schema
//https://mongoosejs.com/docs/guide.html
const mongoose = require("mongoose");
const TestDriveTimes = mongoose.model(
    "testdrivetimes",
    new mongoose.Schema({
        timeslots: []
    })
);
module.exports = TestDriveTimes;
