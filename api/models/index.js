const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.inventory = require("./inventory.model");
db.customerService = require("./customerService.model");
module.exports = db;
