// Author: Tuan Hamid
const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName:String,
        lastName:String,
        username: String,
        password: String,
        role: String,
        isEnabled: Boolean
    })
);
module.exports = User;
