/*
Author: Adarsh Kannan Iyengar
Routes for Customer Service Booking feature
*/
const customerController = require("../controllers/customerService.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/customerService/createBooking",
    customerController.createBooking
  );
  app.get("/api/customerService/viewBooking", customerController.viewBooking);
  
  app.put(
    "/api/customerService/updateBooking/:id",
    customerController.updateBooking
  );

  app.delete(
    "/api/customerService/deleteBooking/:id",
    customerController.deleteBooking
  );
};
