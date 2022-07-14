//Author: Elizabeth James
//Controller for the rentals feature
const controller = require("../controllers/rental.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/rental/get/:seatCount/:distance/:startDate/:endDate", controller.getBetterDeals);
    app.get("/api/rental/factor/get/:startDate", controller.getRentFactor);
    app.get("/api/rental/rate/get/:startDate", controller.getRentRate);
    
};