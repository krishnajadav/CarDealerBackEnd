// Mongoose promise referenced from https://www.bezkoder.com/node-js-mongodb-auth-jwt/
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.testDrives = require("./testDrives/testdrives.model");
db.testDriveCars = require("./testDrives/testdrivecars.model");
db.testDriveTimes = require("./testDrives/testdrivetimes.model");
db.inventory = require("./inventory.model");
db.accessory = require("./accessory.model");
db.rentalrate = require("./rentals/rentalrate.model");
db.rentalfactor = require("./rentals/rentalfactor.model");
db.customerService = require("./customerService.model");
db.vehicle = require("./vehicle.model");
db.tradeInCars = require("./tradeincars.model");
db.dealerService = require("./dealerService.model");
module.exports = db;
