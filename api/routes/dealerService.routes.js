/*
Author: Adarsh Kannan Iyengar
Routes for Dealer Service Booking Management feature
*/
const dealerController = require("../controllers/dealerService.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/dealerService/timeSlot", dealerController.updateTimeSlot);
};
