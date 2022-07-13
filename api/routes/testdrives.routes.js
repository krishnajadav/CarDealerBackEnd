//Author: Leah Isenor
//Routes for the test drive booking feature
const controller = require("../controllers/testdrives.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/testdrives/appointments/unavailable", controller.getUnavailableSlots);
    app.get("/api/testdrives/appointments/:userid", controller.getAppointmentsForUser);
    app.get("/api/testdrives/timeslots", controller.getTimeslots);
    app.get("/api/testdrives/cars", controller.getCars);
    app.put("/api/testdrives/appointments/:userid", controller.bookAppointment);
    app.delete("/api/testdrives/appointments/cancel/:appointmentid", controller.cancelAppointment);
};
